module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
    return {
      dir: {
        input: "src",       // Archivos fuente
        output: "_site",     // Carpeta generada
        includes: "_includes", // Carpeta de plantillas parciales
        layouts: "_layouts"    // Diseños reutilizables
      }
    };
  };