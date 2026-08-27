export function validarPublicacion(publicacion,regla) {
    const longNombre = publicacion.titulo.length
    const longDescripcion = publicacion.descripcion.length
    const longAutor = publicacion.autor.nombre.length
    const longNombreMin = regla.longNombreMin
    const longDescripcionMax = regla.longDescripcionMax
    const longAutorMin = regla.longAutorMin
    return longNombre >= longNombreMin && longDescripcion <= longDescripcionMax && longAutor >= longAutorMin
}