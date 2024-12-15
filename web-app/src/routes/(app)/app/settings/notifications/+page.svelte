<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import * as Form from "$components/ui/form";
  import { Input } from "$components/ui/input";
  import { zodClient } from "sveltekit-superforms/adapters";
  import * as flashModule from "sveltekit-flash-message/client";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";
  import { settingsNotificationsFormSchema } from "$lib/middleware/validations";
  import { Separator } from "$components/ui/separator";

  let { data } = $props();
  const form = superForm(data.form, {
    validators: zodClient(settingsNotificationsFormSchema),
    delayMs: 500,
    timeoutMs: 5000,
    multipleSubmits: "prevent",
    syncFlashMessage: true,
    flashMessage: { module: flashModule }
  });

  const { form: formData, enhance, delayed } = form;
</script>

<div class="space-y-6">
  <div>
    <h3 class="text-lg font-medium">Notifications</h3>
    <p class="text-sm text-muted-foreground">Configure how you receive notifications.</p>
  </div>
  <Separator />
  <form class="flex flex-col gap-2" method="post" use:enhance>
    <Form.Field {form} name="name" class="space-y-1">
      <Form.Control let:attrs>
        <Form.Label>Name</Form.Label>
        <Input {...attrs} type="text" bind:value={$formData.name} />
      </Form.Control>
      <Form.FieldErrors let:errors class="h-4 text-xs">
        {#if errors[0]}
          Invalid name
        {/if}
      </Form.FieldErrors>
    </Form.Field>
    <Form.Button type="submit" disabled={$delayed} class="w-44">
      {#if $delayed}
        <LoaderCircle class="mr-2 h-4 w-4 animate-spin" /> Loading...
      {:else}
        Update notifications
      {/if}
    </Form.Button>
  </form>
</div>
