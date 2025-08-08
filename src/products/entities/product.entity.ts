import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductImage } from './product-image.entity';
import { User } from '../..//auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {

  @ApiProperty({
    example: '0bd054cd-9420-4b2d-a583-6d53a616322f',
    description: 'Product ID',
    uniqueItems: true, 
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Tesla',
    description: 'Product Title',
    uniqueItems: true, 
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 100,
    description: 'Product Price',
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example: 'The Relaxed T Logo Hat is a classic silhouette combined with modern details...',
    description: 'Product Description',
    default: null,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 't_shirt_tesla',
    description: 'Product SLUG - for SEO',
    uniqueItems: true, 
  })
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product Stock',
    default: 0,
  })
  @Column('int', {
    default: 0,
  })
  stock: number;

  @ApiProperty({
    example: ['M','XL','XXL'],
    description: 'Product Sizes',
  })
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ApiProperty({
    example: 'women',
    description: 'Product Gender',
  })
  @Column('text')
  gender: string;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @ApiProperty()
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
