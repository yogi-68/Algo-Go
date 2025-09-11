import React, { useState } from 'react';

interface PlanOption {
	id: 'monthly' | 'yearly';
	title: string;
	priceLabel: string;
	amountCents: number; // in USD cents for display; actual order is created server-side in INR or USD
}

const plans: PlanOption[] = [
	{ id: 'monthly', title: 'Monthly', priceLabel: '$3 / month', amountCents: 300 },
	{ id: 'yearly', title: 'Yearly', priceLabel: '$30 / year', amountCents: 3000 },
];

export const SubscriptionCard: React.FC = () => {
	const [selected, setSelected] = useState<PlanOption>(plans[0]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubscribe = async () => {
		setError('');
		setIsLoading(true);
		try {
			// 1) Create order on backend
			const res = await fetch('/api/razorpay/create-order', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ plan: selected.id }),
			});
			if (!res.ok) {
				throw new Error('Failed to create order');
			}
			const { key, order } = await res.json();

			// 2) Open Razorpay Checkout
			const options: any = {
				key,
				order_id: order.id,
				name: 'Algo Visualizer',
				description: `${selected.title} subscription`,
				prefill: {},
				notes: { plan: selected.id },
				handler: async function (response: any) {
					try {
						await fetch('/api/razorpay/verify', {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								razorpay_order_id: response.razorpay_order_id,
								razorpay_payment_id: response.razorpay_payment_id,
								razorpay_signature: response.razorpay_signature,
							}),
						});
						alert('Subscription activated!');
					} catch (e) {
						setError('Payment captured but verification failed. Contact support.');
					}
				},
				theme: { color: '#3b82f6' },
			};

			// @ts-ignore - Razorpay is loaded globally by script tag in index.html (to be added)
			const rzp = new window.Razorpay(options);
			rzp.open();
		} catch (e: any) {
			setError(e?.message || 'Payment failed');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
				{plans.map((p) => (
					<button
						key={p.id}
						onClick={() => setSelected(p)}
						className={`border rounded-lg p-4 text-left ${selected.id === p.id ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200 dark:border-gray-700'}`}
					>
						<div className="font-semibold">{p.title}</div>
						<div className="text-gray-600 dark:text-gray-400">{p.priceLabel}</div>
					</button>
				))}
			</div>
			{error && <div className="text-sm text-red-600 mb-2">{error}</div>}
			<button
				onClick={handleSubscribe}
				disabled={isLoading}
				className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 px-4 rounded-lg font-medium"
			>
				{isLoading ? 'Processing…' : `Subscribe (${selected.priceLabel})`}
			</button>
			<p className="text-xs text-gray-500 mt-3">Payments are processed securely via Razorpay.</p>
		</div>
	);
}
