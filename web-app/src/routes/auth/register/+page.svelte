<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { Input } from "$components/ui/input";
  import { Button } from "$components/ui/button";
  import * as Form from "$components/ui/form";
  import * as Card from "$components/ui/card";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { registerFormSchema } from "$lib/middleware/validations";
    import * as flashModule from "sveltekit-flash-message/client";
  import { passwordStrength, type FirstOption, type Result, type Option } from "check-password-strength";
  import Eye from "lucide-svelte/icons/eye";
  import EyeOff from "lucide-svelte/icons/eye-off";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";
  
  import { slide } from "svelte/transition";
  import Check from "lucide-svelte/icons/check";
  import X from "lucide-svelte/icons/x";
  


  let { data, attrs, errors } = $props();

  // TODO rename this
  let isPasswordFieldFocused = $state(false);
  let revealPassword = $state(false);
  let passwordInputType = $derived(revealPassword ? "text" : "password");

  const form = superForm(data.form, {
    validators: zodClient(registerFormSchema),
    delayMs: 500,
    timeoutMs: 5000,
    multipleSubmits: "prevent",
    syncFlashMessage: true,
    flashMessage: { module: flashModule },
  });
  const { form: formData, enhance, delayed } = form;


  const customOptions: [FirstOption<string>, ...Option<string>[]] = [
    { id: 0, value: "Too weak", minDiversity: 0, minLength: 0 },
    { id: 1, value: "Weak", minDiversity: 1, minLength: 6 },
    { id: 2, value: "Medium", minDiversity: 2, minLength: 6 },
    { id: 3, value: "Strong", minDiversity: 3, minLength: 8 }
  ];

  let pwd: Result<string> = $state(passwordStrength($formData.password, customOptions));
  let myData: Array<{ name: string; isDone: boolean }> = $derived([
    { name: "Minimum number of characters is "+8, isDone: pwd.length >= 8 },
    { name: "Must contain lowercase.", isDone: pwd.contains.includes("lowercase") },
    { name: "Must contain uppercase.", isDone: pwd.contains.includes("uppercase") },
    { name: "Must contain numbers.", isDone: pwd.contains.includes("number") },
    { name: "Must contain special characters.", isDone: pwd.contains.includes("symbol") }
  ]);

  $effect(() => {
    pwd = passwordStrength($formData.password, customOptions);
  });
</script>

<Card.Header class="space-y-1">
  <Card.Title class="text-2xl">{ "Create an account"}</Card.Title>
</Card.Header>
<Card.Content class="grid gap-4">
  <div class="grid ">
    <Button variant="outline" href="/auth/oauth/google">
      { "Google"}
    </Button>
  </div>
  <div class="relative">
    <div class="absolute inset-0 flex items-center">
      <span class="w-full border-t"></span>
    </div>
    <div class="relative flex justify-center text-xs uppercase">
      <span class="bg-card px-2 text-muted-foreground"> {"or register with"} </span>
    </div>
  </div>
  <form class="flex flex-col gap-2" method="post" use:enhance>
    <Form.Field {form} name="name" class="space-y-1">
      <Form.Control >
        <Form.Label>{"Name"}</Form.Label>
        <Input {...attrs} type="name" bind:value={$formData.name} />
      </Form.Control>
      <Form.FieldErrors class="h-4 text-xs" />
    </Form.Field>
    <Form.Field {form} name="email" class="space-y-1">
      <Form.Control >
        <Form.Label>{"Email" }</Form.Label>
        <Input {...attrs} type="email" bind:value={$formData.email} />
      </Form.Control>
      <Form.FieldErrors class="h-4 text-xs" />
    </Form.Field>
    <Form.Field {form} name="password" class="relative mb-2 space-y-1">
      <Form.Control >
        <Form.Label>{"Password"}</Form.Label>
        <Input
          {...attrs}
          type={passwordInputType}
          bind:value={$formData.password}
          onfocus={() => (isPasswordFieldFocused = true)}
          onblur={() => (isPasswordFieldFocused = false)}
        />
        <Button variant="ghost" class="absolute right-1 top-7 size-8 p-0" on:click={() => (revealPassword = !revealPassword)}>
          {#if passwordInputType === "text"}
            <Eye size={22} />
          {:else}
            <EyeOff size={22} />
          {/if}
        </Button>
        {#if isPasswordFieldFocused}

                  
        <div class="!mt-2 flex h-2 w-full flex-row items-stretch gap-1">
          {#each Array(4).keys() as i}
            {#if pwd.id === 0}
              <span class:bg-red-600={pwd.length > 0 && i <= pwd.id} class="grow rounded border"></span>
            {:else if pwd.id === 1}
              <span class:bg-orange-600={i <= pwd.id} class="grow rounded border"></span>
            {:else if pwd.id === 2}
              <span class:bg-yellow-600={i <= pwd.id} class="grow rounded border"></span>
            {:else if pwd.id === 3}
              <span class:bg-green-600={i <= pwd.id} class="grow rounded border"></span>
            {/if}
          {/each}
        </div>
        <div transition:slide class="rounded-lg border py-2 pl-4">
          <div id="hs-strong-password-hints">
            <div>
              <span class="text-sm text-gray-800 dark:text-gray-200">{"Level:"} <span class="font-bold">{pwd.value}</span></span>
            </div>

            <h4 class="my-2 text-sm text-gray-800 dark:text-white">{"Your password must contain:"}</h4>

            <ul class="space-y-1 text-sm text-gray-500">
              {#each myData as { name, isDone }}
                <li class="flex items-center gap-x-2" class:text-green-600={isDone}>
                  <span class:hidden={!isDone}>
                    <Check class="size-4" color="green" />
                  </span>

                  <span class:hidden={isDone}>
                    <X class="size-4" />
                  </span>
                  {name}
                </li>
              {/each}
            </ul>
          </div>
        </div>



        {/if}
      </Form.Control>
      <Form.FieldErrors  class="h-4 text-xs">
        {#if errors?.[0]}
          {errors?.[0]}
        {/if}
      </Form.FieldErrors>
    </Form.Field>
    <Form.Field {form} name="passwordConfirm" class="space-y-1">
      <Form.Control >
        <Form.Label>{ "Password confirm"}</Form.Label>
        <Input {...attrs} type="password" bind:value={$formData.passwordConfirm} />
      </Form.Control>
      <Form.FieldErrors  class="h-4 text-xs">
        {#if errors?.[0]}
          {errors?.[0]}
        {/if}
      </Form.FieldErrors>
    </Form.Field>
    <Form.Button type="submit" class="mt-4" disabled={$delayed}>
      {#if $delayed}
        <LoaderCircle class="mr-2 h-4 w-4 animate-spin" /> {"Loading..."}
      {:else}
        {"Register"}
      {/if}
    </Form.Button>
  </form>
</Card.Content>
<Card.Footer>
  <p class="text-sm">
    {"Already have an account?"} <a href={("/auth/login")} class="font-medium hover:underline">Login</a>
  </p>
</Card.Footer>
