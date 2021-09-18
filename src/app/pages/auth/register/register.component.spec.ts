import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {MockStoreModule} from '../../../../mocks/store-mock/mock.store.module';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import SpyObj = jasmine.SpyObj;
import {
  loadUserFailure,
  loadUserSuccess,
  registerUser
} from '../../../store/user/user.actions';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let storeSpy: Store;
  let actionsSpy: Actions;
  let routerSpy: SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('routerSpy', ['navigate']);
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        MockStoreModule.forRoot('user', {}),
        ReactiveFormsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents()
    .then(() => {
      storeSpy = TestBed.inject(Store);
      actionsSpy = TestBed.inject(Actions);

      spyOn(actionsSpy, 'pipe').and.callThrough();
      spyOn(storeSpy, 'dispatch').and.callThrough();

      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('doRegister', () => {
    beforeEach(() => {
      component.doRegister();
    });

    it('should set submitted to true', () => {
      expect(component.submitted).toBe(true);
    });

    describe('form is invalid', () => {
      it('should not dispatch an action', () => {
        expect(storeSpy.dispatch).not.toHaveBeenCalled();
      });
    });

    describe('form is valid', () => {
      beforeEach(() => {
        component.registerForm.controls['email'].setErrors(null);
        component.registerForm.controls['password'].setErrors(null);
        component.registerForm.controls['password2'].setErrors(null);
        component.doRegister();
      });

      it('should dispatch RegisterUser action', () => {
        expect(storeSpy.dispatch).toHaveBeenCalledWith(registerUser({ registerForm: {email: '', password: ''}}))
      });

      describe('load user success subscription', () => {
        beforeEach(() => {
          spyOn(component.loadUserSuccessSub, 'unsubscribe').and.callThrough();
          storeSpy.dispatch(loadUserSuccess({ user: { email: '', token: '', id: '', createdAt: ''}}));
        });

        it('should navigate to /game', () => {
          expect(routerSpy.navigate).toHaveBeenCalledWith(['/game']);
        });

        it('should unsubsribe', () => {
          expect(component.loadUserSuccessSub.unsubscribe).toHaveBeenCalled();
        });
      });

      describe('load user failure subscription', function () {
        beforeEach(() => {
          spyOn(console, 'log').and.callThrough();
          storeSpy.dispatch(loadUserFailure({error: new Map()}));
        });

        it('should console log error', () => {
          expect(console.log).toHaveBeenCalledWith('load user error', jasmine.any(Object));
        });
      });
    });
  });
});
