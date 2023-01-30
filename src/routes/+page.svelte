<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import { onMount } from 'svelte';
	import jwt_decode from 'jwt-decode';
	import { env } from '$env/dynamic/public';
	import { user } from '../store/user';

	onMount(() => {
		google.accounts.id.initialize({
			client_id: env.PUBLIC_GOOGLE_AUTH ?? '',
			callback: async (res) => {
				const user1: any = jwt_decode(res.credential);
				console.log(user1);
				user.set({
					id: user1.sub,
					name: user1.name,
					email: user1.email,
					avatar: user1.picture
				});
				const response = await fetch('/api', {
					method: 'POST',
					body: JSON.stringify({ email: user1.email, googleid: user1.sub }),
					headers: {
						'content-type': 'application/json'
					}
				});
			}
		});
		google.accounts.id.prompt();

		google.accounts.id.renderButton(document.getElementById('signinDiv')!, {
			theme: 'outline',
			size: 'large',
			type: 'standard'
		});
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
	{#if $user && $user.id}
		<h2>Welcome {$user.name}</h2>
	{:else}
		<div id="signinDiv" />
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
