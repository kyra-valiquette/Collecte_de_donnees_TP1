import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ReviewsService } from './reviews.service.js';

describe('ReviewsService', () => {
  let service: ReviewsService;

  const reviewModel = {
    create: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
    aggregate: vi.fn(),
  };

  const placeModel = {
    findOne: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        { provide: getModelToken('Place'), useValue: placeModel },
        { provide: getModelToken('Review'), useValue: reviewModel },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
