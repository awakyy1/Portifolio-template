// Stubbed Supabase client: no network, no env vars, preserves `.from(...).select()` API.
// This allows the app to run without a Supabase database while keeping existing imports.
export const supabase = {
	from: (table: string) => ({
		select: async (_query?: string) => {
			return { data: [], error: null }
		},
		insert: async (_payload: any) => ({ data: null, error: null }),
		update: async (_payload: any) => ({ data: null, error: null }),
		delete: async () => ({ data: null, error: null }),
	}),
} as any;