<script>
  import { onMount } from "svelte";
  import "swagger-ui-dist/swagger-ui.css";
  import "swagger-ui-themes/themes/3.x/theme-flattop.css"; // Choose your preferred theme

  //https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md#display

  onMount(async () => {
    const { default: SwaggerUIBundle } = await import(
      "swagger-ui-dist/swagger-ui-bundle"
    );
    SwaggerUIBundle({
      dom_id: "#swagger-ui",
      url: "/openapi.yaml", // Path to the OpenAPI spec (in this case served from static)
      presets: [SwaggerUIBundle.presets.apis],
      layout: "BaseLayout",
      tryItOutEnabled: true,
      syntaxHighlight: {
        theme: "monokai",
        defaultModelsExpandDepth: -1,
        defaultModelExpandDepth: 1,
        defaultModelRendering: "model",
      },
      theme: {
        typography: {
          fontSize: "14px",
          fontFamily: "Roboto, sans-serif",
        },
        colors: {
          primary: {
            main: "#1976D2",
          },
        },
      },
    });
  });
</script>

<div id="swagger-ui" />
