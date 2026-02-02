"use client";
import { useNotify } from "@/components/Toast/toast";
import { DashboardService } from "@/services/dashboard.service";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import TableFilterSPC from "./Filter";
import { ChangeEvent, useState } from "react";
import { LoadingSecond } from "@/components/Loading/second";

export default function TableSpcCount() {
	const dashboardService = new DashboardService();
	const notify = useNotify();
	const [stateName, setStateName] = useState("");
	const [filter, setFilter] = useState<{
		partyAbbreviation?: string;
		stateName?: string;
		cityName?: string;
		legendId?: string;
	}>({});
	const methods = useForm({
		mode: "onSubmit",
	});

	async function handleSearchOnChange(
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
	) {
		const { name, value } = e.target;

		if (name === "stateName") {
			setStateName(value);
			setFilter((old) => ({ ...old, cityName: undefined }));
		}
		setFilter((old) => ({ ...old, [name]: value }));
		await refetch();
	}

	const queryElection = useQuery<
		{
			year: string;
			count: number;
		}[]
	>(
		[
			"dashboardElection",
			filter.partyAbbreviation,
			filter.stateName,
			filter.cityName,
			filter.legendId,
		],
		() =>
			dashboardService.getElection({
				partyAbbreviation: filter.partyAbbreviation,
				stateName: filter.stateName,
				cityName: filter.cityName,
				legendId: filter.legendId,
			}),
		{
			keepPreviousData: true,
			staleTime: 1000 * 60 * 60 * 12,
			retry: 4,
			refetchOnWindowFocus: false,
			onError: (error: any) => {
				if (error.response.data.status === 500) {
					console.error(error);
					return notify({
						type: "error",
						message: "Erro interno, tente novamente mais tarde",
					});
				}

				return notify({
					type: "error",
					message: error.response.data.message,
				});
			},
		}
	);

	const { data, isLoading, isFetching, refetch } = useQuery<{
		SPCA: {
			year: string;
			count: number;
		}[];
		SPCE: {
			year: string;
			count: number;
		}[];
	}>(
		[
			"dashboardSpc",
			filter.partyAbbreviation,
			filter.stateName,
			filter.cityName,
			filter.legendId,
		],
		() =>
			dashboardService.getSpc({
				partyAbbreviation: filter.partyAbbreviation,
				stateName: filter.stateName,
				cityName: filter.cityName,
				legendId: filter.legendId,
			}),
		{
			keepPreviousData: true,
			staleTime: 1000 * 60 * 60 * 12,
			retry: 4,
			refetchOnWindowFocus: false,
			onError: (error: any) => {
				if (error.response.data.status === 500) {
					console.error(error);
					return notify({
						type: "error",
						message: "Erro interno, tente novamente mais tarde",
					});
				}

				return notify({
					type: "error",
					message: error.response.data.message,
				});
			},
		}
	);

	if (isLoading || !data || !queryElection.data || queryElection.isLoading) {
		return (
			<div className="w-full rounded-md border border-slate-200 p-4">
				<div className="flex animate-pulse space-x-4">
					<div className="flex-1 space-y-6 py-1">
						<div className="flex flex-row gap-8">
							<div className="h-2 w-full rounded bg-slate-300"></div>
							<div className="h-2 w-full rounded bg-slate-300"></div>
							<div className="h-2 w-full rounded bg-slate-300"></div>
							<div className="h-2 w-full rounded bg-slate-300"></div>
							<div className="h-2 w-full rounded bg-slate-300"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<fieldset className="fieldset h-fit w-full p-4">
			<div className="mb-4">
				<h4 className="text-h4">SPC</h4>
				<span className="text-span">Verifique a quantidade de SPC</span>
			</div>

			<div className="space-y-8">
				<div className="flex flex-row gap-2">
					<FormProvider {...methods}>
						<form>
							<TableFilterSPC
								stateName={stateName}
								onChange={handleSearchOnChange}
							/>
						</form>
					</FormProvider>
				</div>

				<div className="flex flex-col gap-2">
					<h4 className="text-h4 flex items-center gap-2">
						SPCA {isFetching && <LoadingSecond />}
					</h4>
					{data.SPCA.length > 0 ? (
						<div className="grid grid-flow-row grid-cols-4 gap-2 max-md:grid-cols-4 max-sm:grid-cols-3">
							{data.SPCA.map((spc) =>
								Number(spc.year) < 2017 ? null : (
									<div
										key={spc.year}
										className="min-w-20 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
									>
										<div className="flex flex-col items-center border-b border-slate-200 pb-2">
											<h3 className="font-serif text-2xl font-bold text-slate-800">
												{Object.values(spc.statuses ?? {}).reduce((a, b) => a + b, 0) ?? "0"}
											</h3>
											<p className="font-serif text-xs font-semibold text-slate-600">
												{spc.year}
											</p>
										</div>
										<div className="flex flex-wrap gap-1.5">
											{Object.entries(spc.statuses ?? {}).map(([color, count]) => {
												const isLightColor = color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#fff' || color.toLowerCase() === 'white' || color.toLowerCase() === 'sem-cor';
												return (
													<div
														key={color}
														className={`flex h-6 w-10 items-center justify-center rounded px-2 py-1 text-xs font-semibold shadow-sm ${isLightColor ? 'text-slate-700' : 'text-white'}`}
														style={{ backgroundColor: color }}
														title={color}
													>
														{count}
													</div>
												);
											})}
										</div>
									</div>
								)
							)}
						</div>
					) : (
						<p className="text-span">Nenhum dado encontrado</p>
					)}
				</div>

				<div className="flex flex-col gap-6 w-full" >
					<div className="flex flex-col gap-2">
						<h4 className="text-h4 flex items-center gap-2">
							SPCE {isFetching && <LoadingSecond />}
						</h4>
						{data.SPCE.length > 0 ? (
							<div className="grid grid-flow-row grid-cols-4 gap-4 max-md:grid-cols-4 max-sm:grid-cols-3">
								{data.SPCE.map((spc) =>
									Number(spc.year) < 2017 ? null : (
										<div
											key={spc.year}
											className="min-w-20 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
										>
											<div className="flex flex-col items-center border-b border-slate-200 pb-2">
												<h3 className="font-serif text-2xl font-bold text-slate-800">
													{Object.values(spc.statuses ?? {}).reduce((a, b) => a + b, 0)}
												</h3>
												<p className="font-serif text-xs font-semibold text-slate-600">
													{spc.year}
												</p>
											</div>
											<div className="flex flex-wrap gap-1.5">
												{Object.entries(spc.statuses ?? {}).map(([color, count]) => {
													const isLightColor = color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#fff' || color.toLowerCase() === 'white' || color.toLowerCase() === 'sem-cor';
													return (
														<div
															key={color}
															className={`flex h-6 w-10 items-center justify-center rounded px-2 py-1 text-xs font-semibold shadow-sm ${isLightColor ? 'text-slate-700' : 'text-white'}`}
															style={{ backgroundColor: color }}
															title={color}
														>
															{count}
														</div>
													);
												})}
											</div>
										</div>
									)
								)}
							</div>
						) : (
							<p className="text-span">Nenhum dado encontrado</p>
						)}
					</div>

					<div className="flex flex-col gap-2">
						<h4 className="text-h4 flex items-center gap-2">
							Eleições {queryElection.isFetching && <LoadingSecond />}
						</h4>
						{queryElection?.data?.length > 0 ? (
							<div className="grid grid-flow-row grid-cols-2 gap-2 max-md:grid-cols-4 max-sm:grid-cols-3">
								{queryElection.data.map((election) =>
									Number(election.year) < 2017 ? null : (
										<div
											key={election.year}
											className="min-w-20 flex flex-col items-center justify-center rounded-md border-[1px] bg-white p-4"
										>
											<h3 className="font-serif text-lg font-bold text-slate-800">
												{election.count ?? "0"}
											</h3>
											<p className="font-serif text-xs text-slate-500">
												{election.year}
											</p>
										</div>
									)
								)}
							</div>
						) : (
							<p className="text-span">Nenhum dado encontrado</p>
						)}
					</div>
				</div>
			</div>
		</fieldset>
	);
}
