module.exports = function(eleventyConfig) {
    return {
      dir: {
        input: "src",       // Archivos fuente
        output: "dist",     // Carpeta generada
        includes: "_includes", // Carpeta de plantillas parciales
        layouts: "_layouts"    // Diseños reutilizables
      }
    };
  };