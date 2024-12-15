<script lang="ts">
  import * as Card from "$components/ui/card";
  import * as Form from "$components/ui/form";
    import { Input } from "$components/ui/input";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import * as flashModule from "sveltekit-flash-message/client";
  import { changeEmailFormSchemaSecondStep } from "$lib/middleware/validations";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";
  import { enhance } from "$app/forms";
  
  let { data, attrs, errors } = $props();


  const form = superForm(data.form, {
    validators: zodClient(changeEmailFormSchemaSecondStep),
    delayMs: 500,
    timeoutMs: 5000,
    multipleSubmits: "prevent",
    syncFlashMessage: true,
    flashMessage: { module: flashModule },
  });

  const { form: formData, enhance: enhanceConfirmForm, delayed } = form;

</script>

<Card.Header class="space-y-1">
  <Card.Title class="text-2xl">{"Change your email"}</Card.Title>
</Card.Header>
<Card.Content class="grid gap-4">
  <div class="text-muted-foreground">
    {"Please check your email account for a message to confirm your new email address."
}
  </div>
  <form class="flex flex-col" method="post" action={("confirm /auth/change-email/confirm")} use:enhanceConfirmForm>
    <Form.Field {form} name="token" class="space-y-1">
      <Form.Control >
        <Form.Label>{ "Token"}</Form.Label>
        <Input {...attrs} type="text" bind:value={$formData.token} />
      </Form.Control>
      <Form.FieldErrors class="h-4 text-xs" />
    </Form.Field>
    <Form.Button type="submit" class="mt-2" disabled={$delayed}>
      {#if $delayed}
        <LoaderCircle class="mr-2 h-4 w-4 animate-spin" /> {"Loading..."}
      {:else}
        {"Verify"}
      {/if}
    </Form.Button>
  </form>
</Card.Content>
<Card.Footer>
  {"If you did not receive the email, click on the button below to resend it."}
  <form class="mx-1 flex flex-col" method="post" action={("resendEmail /auth/change-email/confirm")} use:enhance>
    <button type="submit" class="underline">{"Resend email"}</button>
  </form>
</Card.Footer>
