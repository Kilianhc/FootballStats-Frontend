import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import StatChart from "./components/StatChart";

const AdvancedStatsPage = ({ players }) => {
    const [advancedStats, setAdvancedStats] = useState({
        porteros: [], defensas: [], centrocampistas: [], delanteros: []});

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
            <Box mt={5} mb={8}>
                <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                    {/* Primera fila */}
                    <Grid item xs={12} sm={4}>
                        <StatChart title="% de Entradas Exitosas (Defensas)"
                            data={createChartData(advancedStats.defensas, "triedTackles", "succesTackles", true)}
                            dataKey1="percentage" unit="%" color1="#007acc" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatChart title="% de Regates Exitosos (Delanteros)"
                            data={createChartData(advancedStats.delanteros, "triedDribblings", "succesDribblings", true)}
                            dataKey1="percentage" unit="%" color1="#5c08bd" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatChart title="% de Pases Exitosos (Centrocampistas)"
                            data={createChartData(advancedStats.centrocampistas, "triedPass", "succesPass", true)}
                            dataKey1="percentage" unit="%" color1="#007acc" />
                    </Grid>
                    {/* Segunda fila */}
                    <Grid item xs={12} sm={4}>
                        <StatChart title="Disparos a Puerta vs Disparos Fuera (Delanteros)"
                            data={createChartData(advancedStats.delanteros, "goalShoots", "outShoots")}
                            dataKey1="value1" dataKey2="value2" color1="#007acc" color2="#5c08bd" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatChart title="% de Paradas (Porteros)"
                            data={createChartData(advancedStats.porteros, "shootsOnGoalReceived", "goalsConceded", true)}
                            dataKey1="percentage" unit="%" color1="#5c08bd" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatChart title="Paradas vs Disparos Recibidos (Porteros)"
                            data={createChartData(advancedStats.porteros, "saves", "shootsOnGoalReceived")}
                            dataKey1="value1" dataKey2="value2" color1="#5c08bd" color2="#007acc" />
                    </Grid>
                    {/* Tercera fila */}
                    <Grid item xs={12} sm={4}>
                        <StatChart title="Pérdidas de Balón vs Robos de Balón (Centrocampistas)"
                            data={createChartData(advancedStats.centrocampistas, "turnoversBall", "stealsBall")}
                            dataKey1="value1" dataKey2="value2" color1="#5c08bd" color2="#007acc" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatChart title="Goles vs Minutos (Delanteros)"
                            data={createChartData(advancedStats.delanteros, "matchs", "goals")}
                            dataKey1="value1" dataKey2="value2" color1="#5c08bd" color2="#007acc" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <StatChart title="Asistencias vs Partidos (Centrocampistas)"
                            data={createChartData(advancedStats.centrocampistas, "matchs", "asists")}
                            dataKey1="value1" dataKey2="value2" color1="#5c08bd" color2="#007acc" />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default AdvancedStatsPage;
