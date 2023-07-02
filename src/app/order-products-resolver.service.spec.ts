import { TestBed } from '@angular/core/testing';

import { OrderProductsResolverService } from './order-products-resolver.service';

describe('OrderProductsResolverService', () => {
  let service: OrderProductsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderProductsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
