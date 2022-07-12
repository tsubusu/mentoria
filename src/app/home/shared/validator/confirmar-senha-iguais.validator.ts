import { FormGroup, ValidationErrors } from '@angular/forms';

export function confirmarSenhaIguaisValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password')?.value ?? ''; // ?? significa se isso for undefined passe nesse caso vazio
    const confirmPassword = formGroup.get('confirmPassword')?.value ?? '';
    
    if (password?.trim() + confirmPassword?.trim()) {
        return password !== confirmPassword ? { senhasIguais: true } as ValidationErrors : null
    } 

    return null;
}