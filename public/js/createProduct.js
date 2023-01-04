function showCategories() {

  let selectedCategory = document.getElementById("categoria").value

  tamanio.style.display = selectedCategory == 'monitores' ? 'block' : 'none'
  resolucionMonitor.style.display = selectedCategory == 'monitores' ? 'block' : 'none'
  esGamer.style.display = selectedCategory == 'monitores' ? 'block' : 'none'
  esCurvo.style.display = selectedCategory == 'monitores' ? 'block' : 'none'

  tipo.style.display = selectedCategory == 'placasDeVideo' ? 'block' : 'none'
  fabricante.style.display = selectedCategory == 'placasDeVideo' ? 'block' : 'none'
  memoria.style.display = selectedCategory == 'placasDeVideo' ? 'block' : 'none'
  interfaz.style.display = selectedCategory == 'placasDeVideo' ? 'block' : 'none'

  memoriaSoportada.style.display = selectedCategory == 'microprocesadores' ? 'block' : 'none'
  generacion.style.display = selectedCategory == 'microprocesadores' ? 'block' : 'none'
  cantidadNucleos.style.display = selectedCategory == 'microprocesadores' ? 'block' : 'none'
  frecuencia.style.display = selectedCategory == 'microprocesadores' ? 'block' : 'none'

  plataforma.style.display = selectedCategory == 'motherboards' ? 'block' : 'none'
  chipsets.style.display = selectedCategory == 'motherboards' ? 'block' : 'none'
  ranuras.style.display = selectedCategory == 'motherboards' ? 'block' : 'none'
  capacidadMaxima.style.display = selectedCategory == 'motherboards' ? 'block' : 'none'
}
