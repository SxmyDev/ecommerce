import { Component } from '@angular/core';
import { AuthService } from "src/app/auth.service"; // Asegúrate de importar tu servicio de autenticación
import { Router } from '@angular/router'; // Importa el servicio Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { } // Inyecta el servicio Router

  login() {
    this.authService.login(this.credentials).subscribe(
      data => {
        // Almacenar el token en el almacenamiento local
        localStorage.setItem('token', data.token);

        // Almacenar los detalles del usuario en el servicio
        this.authService.setUserDetails(data.user);

        // Redirigir al usuario a la página principal
        this.router.navigate(['/']);
      },
      error => {
        // Aquí puedes manejar el error y mostrar el mensaje al usuario
        console.error('Hubo un error durante el inicio de sesión:', error);
      }
    );
  }
}
