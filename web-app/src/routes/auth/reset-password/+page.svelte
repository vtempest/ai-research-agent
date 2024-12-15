<script lang="ts">
  import * as Card from "$components/ui/card";
  import * as Form from "$components/ui/form";
  import { Input } from "$components/ui/input";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import * as flashModule from "sveltekit-flash-message/client";
  import { resetPasswordFormSchemaFirstStep } from "$lib/middleware/validations";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";
  

  let { data, attrs, errors } = $props();

  const form = superForm(data.form, {
    validators: zodClient(resetPasswordFormSchemaFirstStep),
    delayMs: 500,
    timeoutMs: 5000,
    multipleSubmits: "prevent",
    syncFlashMessage: true,
    flashMessage: { module: flashModule },
  });

  const { form: formData, enhance, delayed } = form;

</script>

<Card.Header class="space-y-1">
  <Card.Title class="text-2xl">{"Reset your password"}</Card.Title>
</Card.Header>
<Card.Content class="grid gap-4">
  <div class="text-muted-foreground">{"Please insert your email to receive a token to reset your password."}</div>
  <form class="flex flex-col" method="post" use:enhance>
    <Form.Field {form} name="email" class="space-y-1">
      <Form.Control >
        <Form.Label>{"Email" }</Form.Label>
        <Input {...attrs} type="text" bind:value={$formData.email} />
      </Form.Control>
      <Form.FieldErrors class="h-4 text-xs" />
    </Form.Field>
    <Form.Button type="submit" disabled={$delayed}>
      {#if $delayed}
        <LoaderCircle class="mr-2 h-4 w-4 animate-spin" /> {"Loading..."}
      {:else}
        {"Verify"}
      {/if}
    </Form.Button>
  </form>
</Card.Content>
