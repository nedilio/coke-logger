# TODO

## Cuenta
- [ ] Al eliminar una cuenta, borrar también sus archivos en UploadThing (foto de perfil `user.profileImageUrl` y fotos de registros `coke_log.image_url`). Hoy se borran las filas en la base (cascade) pero los archivos quedan. Opción: hook `user.deleteUser.beforeDelete` en `lib/auth.ts` que junte las URLs y llame a `UTApi.deleteFiles()`. Aplica a web y app iOS (mismo endpoint).
