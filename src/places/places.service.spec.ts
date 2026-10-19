import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PlacesService } from './places.service.js';

describe('PlacesService', () => {
  let service: PlacesService;

  const placeModel = {
    create: vi.fn(),
    find: vi.fn(),
    countDocuments: vi.fn(),
    findOne: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  };

  const reviewModel = {
    countDocuments: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacesService,
        { provide: getModelToken('Place'), useValue: placeModel },
        { provide: getModelToken('Review'), useValue: reviewModel },
      ],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
