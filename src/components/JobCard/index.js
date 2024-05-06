import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { useState } from "react";
import { getCurrencySymbol, getMinMaxLabel } from "../../utils";

export default function JobCard({
  posted,
  companyName,
  logoUrl,
  jobRole,
  location,
  salaryCurrencyCode,
  minJdSalary,
  maxJdSalary,
  jobDetailsFromCompany,
  minExp,
  maxExp,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        maxWidth: 350,
        px: 1,
        py: 2,
        borderRadius: 4,
        boxShadow: "#00000040",
      }}
    >
      <CardHeader
        component={() => (
          <>
            <Chip
              icon={<HourglassTopIcon fontSize="12px" />}
              label={`Posted ${posted}`}
              variant="outlined"
              size="small"
              sx={{ fontWeight: "light", fontSize: "12px" }}
            />
            <Stack direction="row" sx={{ mt: 2 }}>
              <img src={logoUrl} alt={companyName} width={32} height={32} />
              <Stack spacing="2px" ml={1}>
                <Typography color="#90a4ae" lineHeight={0.8}>
                  {companyName}
                </Typography>
                <Typography
                  fontWeight="light"
                  fontSize="14px"
                  textTransform="capitalize"
                >
                  {jobRole}
                </Typography>
                <Typography
                  fontSize="12px"
                  variant="caption"
                  textTransform="capitalize"
                >
                  {location}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
              <Typography sx={{ fontSize: "14px" }} color="#607d8b">
                Estimated Salary: {getCurrencySymbol(salaryCurrencyCode)}
                {getMinMaxLabel(minJdSalary, maxJdSalary)}
              </Typography>
              <CheckBoxIcon fontSize="12" color="success" />
            </Stack>
          </>
        )}
      />
      <CardContent sx={{ px: 0 }}>
        <Stack>
          <Stack sx={{ position: "relative" }}>
            <Typography>About Company:</Typography>
            <Collapse in={expanded} collapsedSize={200}>
              <Typography sx={{ fontWeight: "light", fontSize: "14px" }}>
                {jobDetailsFromCompany}
              </Typography>
            </Collapse>
            {!expanded ? (
              <Button
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100px",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background:
                    "linear-gradient(0deg, rgba(255,255,255,1) 16%, rgba(255,255,255,0.7497592787114846) 65%, rgba(255,255,255,0) 83%)",
                }}
                variant="text"
                onClick={() => setExpanded(!expanded)}
              >
                <Typography variant="caption">View Job</Typography>
              </Button>
            ) : null}
          </Stack>
          <Stack mt={2}>
            <Typography fontSize="14px" color="#90a4ae">
              Minimum Experience
            </Typography>
            <Typography fontWeight="light" fontSize="14px">
              {minExp || maxExp ? `${getMinMaxLabel(minExp, maxExp)} years` : 'NA'}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Stack spacing={1}>
        <Button
          startIcon={<ElectricBoltIcon />}
          variant="contained"
          sx={{
            backgroundColor: "#55efc4",
            ":hover": { backgroundColor: "#3de7b8" },
          }}
          disableElevation
        >
          <Typography color="black">Easy Apply</Typography>
        </Button>
      </Stack>
    </Card>
  );
}
