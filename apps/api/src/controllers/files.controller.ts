import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { prisma } from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import fs from 'fs/promises';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const filesController = {
  // Get project file structure
  async getFileStructure(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;

    const project = await prisma.project.findFirst({
      where: { id, userId },
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (project.status !== 'ready') {
      throw new AppError('Project files not yet generated', 400);
    }

    const projectPath = path.resolve(
      __dirname,
      '../../../../generated-projects',
      project.slug
    );

    try {
      const structure = await getDirectoryStructure(projectPath);
      
      res.json({
        status: 'success',
        data: {
          structure,
          path: projectPath,
        },
      });
    } catch (error) {
      throw new AppError('Failed to read project files', 500);
    }
  },

  // Download project as ZIP
  async downloadProject(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;

    const project = await prisma.project.findFirst({
      where: { id, userId },
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (project.status !== 'ready') {
      throw new AppError('Project files not yet generated', 400);
    }

    const projectPath = path.resolve(
      __dirname,
      '../../../../generated-projects',
      project.slug
    );

    try {
      await fs.access(projectPath);
    } catch {
      throw new AppError('Project files not found', 404);
    }

    // Set headers for download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${project.slug}.zip"`
    );

    // Create zip archive
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    archive.on('error', (err) => {
      throw err;
    });

    // Pipe archive to response
    archive.pipe(res);

    // Add directory to archive
    archive.directory(projectPath, false);

    // Finalize archive
    await archive.finalize();
  },

  // Get file content
  async getFileContent(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { filePath } = req.query;
    const userId = req.user?.id;

    if (!filePath || typeof filePath !== 'string') {
      throw new AppError('File path is required', 400);
    }

    const project = await prisma.project.findFirst({
      where: { id, userId },
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (project.status !== 'ready') {
      throw new AppError('Project files not yet generated', 400);
    }

    const projectPath = path.resolve(
      __dirname,
      '../../../../generated-projects',
      project.slug
    );

    // Security: Ensure file path is within project directory
    const fullPath = path.resolve(projectPath, filePath);
    if (!fullPath.startsWith(projectPath)) {
      throw new AppError('Invalid file path', 400);
    }

    try {
      const content = await fs.readFile(fullPath, 'utf-8');
      const stats = await fs.stat(fullPath);

      res.json({
        status: 'success',
        data: {
          content,
          path: filePath,
          size: stats.size,
          modified: stats.mtime,
        },
      });
    } catch (error) {
      throw new AppError('File not found or cannot be read', 404);
    }
  },
};

// Helper to get directory structure
async function getDirectoryStructure(
  dirPath: string,
  relativePath: string = ''
): Promise<any[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const structure: any[] = [];

  for (const entry of entries) {
    // Skip node_modules, .git, etc.
    if (['node_modules', '.git', 'dist', 'build', '.next'].includes(entry.name)) {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    const itemPath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      const children = await getDirectoryStructure(fullPath, itemPath);
      structure.push({
        name: entry.name,
        type: 'directory',
        path: itemPath,
        children,
      });
    } else {
      const stats = await fs.stat(fullPath);
      structure.push({
        name: entry.name,
        type: 'file',
        path: itemPath,
        size: stats.size,
      });
    }
  }

  return structure;
}
