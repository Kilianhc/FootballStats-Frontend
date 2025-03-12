import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import Grid from "@mui/material/Grid";

const AdvancedStatsPage = ({ players }) => {
    const [advancedStats, setAdvancedStats] = useState({
        porteros: [],
        defensas: [],
        centrocampistas: [],
        delanteros: [],
    });

    useEffect(() => {
        const groupedPlayers = {
            porteros: players.filter((player) => player.position === "Portero"),
            defensas: players.filter((player) => player.position === "Defensa"),
            centrocampistas: players.filter((player) => player.position === "Centrocampista"),
            delanteros: players.filter((player) => player.position === "Delantero"),
        };

        setAdvancedStats(groupedPlayers);
    }, [players]);

    const createChartData = (players, stat1, stat2, isPercentage = false) => {
        return players.map((player) => {
            const value1 = player.stats[stat1] || 0;
            const value2 = player.stats[stat2] || 0;

            if (isPercentage) {
                const percentage = value1 > 0 ? (value2 / value1) * 100 : 0;
                return { name: player.name, percentage };
            }

            return { name: player.name, value1, value2 };
        });
    };

    return (
        <Container maxWidth="xl">
            <Box mt={5} mb={5}>
                <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                    {/* Primer gráfico */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: "20px", background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", height: "100%" }}>
                            <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                <Typography variant="h6" mb={2}>Paradas vs Disparos Recibidos (Porteros)</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={createChartData(advancedStats.porteros, "saves", "shootsOnGoalReceived")}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis fontSize="x-large" dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value1" fill="#4f0674" />
                                        <Bar dataKey="value2" fill="#e6790f" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Segundo gráfico */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: "20px", background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", height: "100%" }}>
                            <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                <Typography variant="h6" mb={2}>% de Paradas (Porteros)</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={createChartData(advancedStats.porteros, "shootsOnGoalReceived", "goalsConceded", true)}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis fontSize="x-large" dataKey="name" />
                                        <YAxis unit="%" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="percentage" fill="#4f0674" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Nueva fila de gráficos */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: "20px", background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", height: "100%" }}>
                            <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                <Typography variant="h6" mb={2}>% de Entradas Exitosas (Defensas)</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={createChartData(advancedStats.defensas, "triedTackles", "succesTackles", true)}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis fontSize="x-large" dataKey="name" />
                                        <YAxis unit="%" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="percentage" fill="#007acc" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: "20px", background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", height: "100%" }}>
                            <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                <Typography variant="h6" mb={2}>% de Pases Exitosos (Centrocampistas)</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={createChartData(advancedStats.centrocampistas, "triedPass", "succesPass", true)}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis fontSize="x-large" dataKey="name" />
                                        <YAxis unit="%" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="percentage" fill="#007acc" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Nueva fila de gráficos */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: "20px", background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", height: "100%" }}>
                            <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                <Typography variant="h6" mb={2}>Disparos a Puerta vs Disparos Fuera (Delanteros)</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={createChartData(advancedStats.delanteros, "goalShoots", "outShoots")}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis fontSize="x-large" dataKey="name" />
                                        <YAxis unit="%" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value1" fill="#93900f" />
                                        <Bar dataKey="value2" fill="#bb5005" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: "20px", background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", height: "100%" }}>
                            <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                <Typography variant="h6" mb={2}>% de Regates Exitosos (Delanteros)</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={createChartData(advancedStats.delanteros, "triedDribblings", "succesDribblings", true)}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis fontSize="x-large" dataKey="name" />
                                        <YAxis unit="%" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="percentage" fill="#5c08bd" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default AdvancedStatsPage;
