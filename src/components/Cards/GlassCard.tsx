// mui
import Card from '@mui/material/Card';
import { styled, alpha } from "@mui/material/styles";

const GlassCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: `blur(10px)`,
    WebkitBackdropFilter: `blur(10px)`,
    backgroundColor: alpha(theme.palette.background.default, 0.3)
}))

export default GlassCard;