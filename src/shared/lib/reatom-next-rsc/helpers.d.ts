export interface NextAppPageProps<T extends Record<string, unknown>> {
	params: T
	searchParams: Record<string, string | string[] | undefined>;
}