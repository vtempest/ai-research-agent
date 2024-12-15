<script lang="ts">
  import { zodClient } from "sveltekit-superforms/adapters";
  import { superForm } from "sveltekit-superforms";
  import * as flashModule from "sveltekit-flash-message/client";

  import * as Form from "$components/ui/form";
  import { Input } from "$components/ui/input";
  import * as Card from "$components/ui/card";
  import { loginFormSchema } from "$lib/middleware/validations";
  import { Button } from "$components/ui/button";

  export let data = null;
  const form = superForm(data.form, {
    validators: zodClient(loginFormSchema),
    delayMs: 500,
    timeoutMs: 5000,
    multipleSubmits: "prevent",
    syncFlashMessage: true,
    flashMessage: { module: flashModule },
  });

  const { form: formData, enhance, delayed } = form;
</script>

<Card.Header class="space-y-1">
  <Card.Title class="text-2xl">{"Login to your account"}</Card.Title>
</Card.Header>
<Card.Content class="grid gap-4">
  <div class="grid">
    <Button variant="outline" href="/auth/oauth/google">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        class="w-5 h-5 mr-2"
      >
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        />
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
        />
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        />
      </svg>

      Google
    </Button>
  </div>
  <div class="relative">
    <div class="absolute inset-0 flex items-center">
      <span class="w-full border-t"></span>
    </div>
    <div class="relative flex justify-center text-xs uppercase">
      <span class="bg-card px-2 text-muted-foreground">
        {"or login with"}
      </span>
    </div>
  </div>
  <form class="flex flex-col gap-2" method="post" use:enhance>
    <Form.Field {form} name="email" class="space-y-1">
      <Form.Control>
        <Form.Label>{"Email"}</Form.Label>
        <Input type="email" bind:value={$formData.email} />
      </Form.Control>
      <Form.FieldErrors class="h-4 text-xs" />
    </Form.Field>
    <Form.Field {form} name="password" class="space-y-1">
      <Form.Control>
        <Form.Label>{"Password"}</Form.Label>
        <Input type="password" bind:value={$formData.password} />
      </Form.Control>
      <Form.FieldErrors class="h-4 text-xs" />
    </Form.Field>
    <a
      href={"/auth/reset-password"}
      class="flex justify-end text-right text-sm font-medium hover:underline"
    >
      {"Forgot password?"}
    </a>
    <Form.Button type="submit" disabled={$delayed}>Login</Form.Button>
  </form>
</Card.Content>
<Card.Footer>
  <p class="text-sm">
    {"Don't have an account yet?"}
    <a href={"/auth/register"} class="font-medium hover:underline">
      {"Register"}
    </a>
  </p>
</Card.Footer>
