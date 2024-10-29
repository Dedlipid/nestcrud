import { Test, TestingModule } from '@nestjs/testing';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { NotFoundException } from '@nestjs/common';

// Mock for HeroesService
const mockHeroesService = {
  create: jest.fn((dto) => ({
    id: `123e4567-e89b-12d3-a456-426614174${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0')}`, // Mock UUID
    ...dto,
  })),
  findAll: jest.fn(({ skip, take }) => {
    return mockHeroesService.heroes.slice(skip, skip + take);
  }),
  findOne: jest.fn((id) =>
    mockHeroesService.heroes.find((hero) => hero.id === id),
  ),
  update: jest.fn((id, dto) => {
    const hero = mockHeroesService.heroes.find((hero) => hero.id === id);
    if (hero) {
      Object.assign(hero, dto);
      return hero;
    }
    throw new NotFoundException();
  }),
  remove: jest.fn((id) => {
    const index = mockHeroesService.heroes.findIndex((hero) => hero.id === id);
    if (index !== -1) {
      return mockHeroesService.heroes.splice(index, 1)[0];
    }
    throw new NotFoundException();
  }),
  heroes: [], // Array to store created heroes
};

describe('HeroesController', () => {
  let controller: HeroesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroesController],
      providers: [
        {
          provide: HeroesService,
          useValue: mockHeroesService,
        },
      ],
    }).compile();

    controller = module.get<HeroesController>(HeroesController);
    mockHeroesService.heroes = []; // Reset heroes array before each test
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a hero', async () => {
      const createHeroDto: CreateHeroDto = {
        name: 'New Hero',
        race: 'Elf',
        gender: 'Female',
        bio: 'A skilled archer',
        maxHealth: 120,
        currentHealth: 120,
        attack: 15,
        defense: 8,
        healthRestoreRate: 2,
        lastDamageAt: '2023-10-24T00:00:00Z',
      };
      const result = await controller.create(createHeroDto);
      expect(result).toEqual({
        id: expect.any(String),
        ...createHeroDto,
      });
      expect(mockHeroesService.create).toHaveBeenCalledWith(createHeroDto);
    });
  });

  describe('findAll', () => {
    beforeEach(async () => {
      // Create 200 heroes
      const createHeroDto: CreateHeroDto = {
        name: 'Hero',
        race: 'Human',
        gender: 'Male',
        bio: 'A brave hero',
        maxHealth: 100,
        currentHealth: 100,
        attack: 10,
        defense: 5,
        healthRestoreRate: 1,
        lastDamageAt: '2023-10-24T00:00:00Z',
      };
      for (let i = 0; i < 200; i++) {
        const hero = await controller.create(createHeroDto);
        mockHeroesService.heroes.push(hero);
      }
    });

    it('should return an array of heroes', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(expect.any(Array));
      expect(mockHeroesService.findAll).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });

    it('should apply pagination limits', async () => {
      const result = await controller.findAll(150, 0);
      expect(result.length).toBe(100); // Should return a maximum of 100 heroes due to the limit
      expect(mockHeroesService.findAll).toHaveBeenCalledWith({
        skip: 0,
        take: 100,
      });
    });

    it('should handle large datasets and query for 150 heroes', async () => {
      const result = await controller.findAll(150, 0);
      expect(result.length).toBe(100); // Should return a maximum of 100 heroes due to the limit
      expect(mockHeroesService.findAll).toHaveBeenCalledWith({
        skip: 0,
        take: 100,
      });
    });
  });

  // describe('update', () => {
  //   it('should update a hero', async () => {
  //     const createHeroDto: CreateHeroDto = {
  //       name: 'Hero',
  //       race: 'Human',
  //       gender: 'Male',
  //       bio: 'A brave hero',
  //       maxHealth: 100,
  //       currentHealth: 100,
  //       attack: 10,
  //       defense: 5,
  //       healthRestoreRate: 1,
  //       lastDamageAt: '2023-10-24T00:00:00Z',
  //     };
  //     const createdHero = await controller.create(createHeroDto);
  //     const id = createdHero.id;
  //     const updateHeroDto: UpdateHeroDto = {
  //       name: 'Updated Hero',
  //       race: 'Orc',
  //       gender: 'Male',
  //       bio: 'A fierce warrior',
  //       maxHealth: 150,
  //       currentHealth: 150,
  //       attack: 20,
  //       defense: 10,
  //       healthRestoreRate: 3,
  //       lastDamageAt: '2023-10-24T00:00:00Z',
  //     };
  //     const result = await controller.update(id, updateHeroDto);
  //     expect(result).toEqual({
  //       id,
  //       ...updateHeroDto,
  //     });
  //     expect(mockHeroesService.update).toHaveBeenCalledWith(id, updateHeroDto);
  //   });
  // });

  // describe('remove', () => {
  //   it('should remove a hero', async () => {
  //     const id = '123e4567-e89b-12d3-a456-426614174000';
  //     const result = await controller.remove(id);
  //     expect(result).toEqual({ id });
  //     expect(mockHeroesService.remove).toHaveBeenCalledWith(id);
  //   });
  // });
});
