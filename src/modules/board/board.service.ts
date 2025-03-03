import { Inject, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { board } from 'src/database/admin.schema';
import { and, count, eq, ilike, isNull } from 'drizzle-orm';

@Injectable()
export class BoardService {
  constructor(
    @Inject('DATABASE')
    private db: NodePgDatabase,
  ) {}
  create(createBoardDto: CreateBoardDto) {
    return this.db.insert(board).values(createBoardDto).returning();
  }


//   async findAll(filterDto: ItemFilterDto) {
//     const { name, status, page = 1, limit = 10, includeDeleted = false } = filterDto;
//     const offset = (page - 1) * limit;
    
//     // Build filters
//     const conditions: SQL[] = [];
    
//     // Add name filter if provided
//     if (name) {
//       conditions.push(ilike(items.name, `%${name}%`));
//     }
    
//     // Add status filter if provided
//     if (status) {
//       conditions.push(eq(items.status, status));
//     }
    
//     // Handle soft deletes
//     if (!includeDeleted) {
//       conditions.push(eq(items.isDeleted, false));
//     }
    
//     // Final filter condition
//     const whereCondition = conditions.length > 0 
//       ? and(...conditions) 
//       : undefined;
    
//     // Execute query with pagination
//     const data = await this.drizzle.db.query.items.findMany({
//       where: whereCondition,
//       limit: limit,
//       offset: offset,
//       orderBy: items.id
//     });
    
//     // Get total count for pagination metadata
//     const countResult = await this.drizzle.db.select({ count: count() })
//       .from(items)
//       .where(whereCondition);
    
//     const total = Number(countResult[0].count);
    
//     return {
//       data,
//       meta: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit)
//       }
//     };
//   }
// }
async findAll(page: number = 1, limit: number = 10, searchFilters?: { name?: string; status?: string }) {
  const offset = (page - 1) * limit;
  
  // Building dynamic filters
  const filters = [];
  console.log(filters, "Initial Filters");
  
  // Add the soft delete filter
  // NOTE: Changed from isNull to is not null if you're using a deletedAt timestamp
  // If using a boolean isDeleted field, use: eq(board.isDeleted, false)
  filters.push(isNull(board.deletedAt));
  
  // if (searchFilters?.name && searchFilters.name.trim()) {
  //   filters.push(ilike(board.name, `%${searchFilters.name.trim()}%`));
  //   console.log('Added name filter');
  // }
  
  // if (searchFilters?.status && searchFilters.status.trim()) {
  //   // Fix potential type issues
  //   const statusValue = searchFilters.status.trim() as 'active' | 'inactive';
  //   filters.push(eq(board.status, statusValue));
  //   console.log('Added status filter');
  // }
  
  console.log(filters, "Final Filters");

  // Add a try/catch to debug potential errors
  try {
    // Make sure your where clause has at least one filter
    const whereCondition = filters.length > 0 ? and(...filters) : undefined;
    
    const data = await this.db
      .select()
      .from(board)
      .where(whereCondition)
      // .limit(limit)
      // .offset(offset);
    
    console.log('Data:', data);
    
    // Use count() function instead of selecting ID for counting
    const totalResult = await this.db
      .select({ count: count() })
      .from(board)
      .where(whereCondition);
    
    const total = Number(totalResult[0]?.count || 0);
    console.log('Total:', total);
    
    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error('Error in findAll:', error);
    throw error;
  }
}
  

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
