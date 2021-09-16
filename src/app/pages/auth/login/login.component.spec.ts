import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import SpyObj = jasmine.SpyObj;
import {MockStoreModule} from '../../../../mocks/store-mock/mock.store.module';
import {UserState} from '../../../store/user/user.reducer';
import {LoadUserFailure, LoadUserSuccess, LoginUser} from '../../../store/user/user.actions';
import {Actions} from '@ngrx/effects';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let routerSpy: SpyObj<Router>;
  let storeSpy: Store<UserState>;
  let actionsSpy: Actions;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('routerSpy', ['navigate']);
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
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

      fixture = TestBed.createComponent(LoginComponent);
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

  describe('doLogin', () => {
    beforeEach(() => {
      component.doLogin();
    });

    it('should set submitted to true', () => {
      expect(component.submitted).toBe(true);
    });

    describe('form is invalid', () => {
      beforeEach(() => {
        component.loginForm.updateValueAndValidity({ onlySelf: false });
        component.doLogin()
      });

      it('should not dispatch an action', () => {
        expect(storeSpy.dispatch).not.toHaveBeenCalledWith(new LoginUser({ login: {email: '', password: ''}}))
      });
    });

    describe('form is valid', () => {
      beforeEach(() => {
        component.loginForm.controls['email'].setErrors(null);
        component.loginForm.controls['password'].setErrors(null);
        component.doLogin();
      });

      it('should dispatch LoginUser action', () => {
        expect(storeSpy.dispatch).toHaveBeenCalledWith(new LoginUser({ login: {email: '', password: ''}}))
      });

      describe('load user success subscription', () => {
        beforeEach(() => {
          spyOn(component.loadUserSuccessSub, 'unsubscribe').and.callThrough();
          storeSpy.dispatch(new LoadUserSuccess({ user: { email: '', token: '', id: '', createdAt: ''}}));
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
          storeSpy.dispatch(new LoadUserFailure({error: {}}));
        });

        it('should console log error', () => {
          expect(console.log).toHaveBeenCalledWith('load user error', jasmine.any(Object));
        });
      });
    });
  });
});
