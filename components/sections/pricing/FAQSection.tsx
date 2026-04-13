"use client";

import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Container,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type FaqItem = {
  q: string;
  a: string;
};

const FAQS: FaqItem[] = [
  {
    q: "Does Cognivision support my business use case?",
    a: "Yes — tell us your workflow and we’ll recommend the best approach.",
  },
  {
    q: "Where can I ask questions about the product before purchasing?",
    a: "You can reach out via Contact, or ask in our community channels.",
  },
  {
    q: "Do Cognivision subscriptions cover YOLO model licensing?",
    a: "Licensing depends on the model and intended use. Contact sales for details.",
  },
  {
    q: "Do I need a credit card to use Cognivision?",
    a: "No. You can start on the free plan without a credit card.",
  },
  {
    q: "What is a credit?",
    a: "Credits are usage units applied to training, inference, or compute activities.",
  },
  {
    q: "What happens after my subscription ends?",
    a: "Your plan downgrades and private resources follow retention rules.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept major cards and invoicing for enterprise.",
  },
  {
    q: "Is Cognivision free to use?",
    a: "Yes — we offer a free tier with included credits.",
  },
  {
    q: "Can I switch my plan after I create my account?",
    a: "Yes, you can upgrade or downgrade any time from billing settings.",
  },
  {
    q: "Will I be charged during my trial?",
    a: "No charges happen unless you explicitly upgrade to a paid plan.",
  },
  {
    q: "What happens once my trial ends?",
    a: "Your account will move to the free tier unless you upgrade.",
  },
  {
    q: "Can I use Cognivision with private data?",
    a: "Yes — the Core plan supports private datasets and models.",
  },
];

export default function FaqSection() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#F4F7FF",
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: 28, sm: 34 },
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            letterSpacing: 0.2,
            color: "#111827",
            mb: 3.5,
          }}
        >
          Frequently Asked Questions
        </Typography>

        {/* List wrapper */}
        <Box
          maxWidth="lg"
          sx={{
            borderTop: "1px solid rgba(17,24,39,0.08)",
          }}
        >
          {FAQS.map((item, idx) => {
            const panelId = `faq-${idx}`;
            const isOpen = expanded === panelId;

            return (
              <Accordion
                key={panelId}
                expanded={isOpen}
                onChange={handleChange(panelId)}
                disableGutters
                elevation={0}
                square
                sx={{
                  bgcolor: "transparent",
                  borderBottom: "1px solid rgba(17,24,39,0.08)",
                  "&:before": { display: "none" }, // remove MUI default line
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ChevronRightIcon
                      sx={{
                        color: "#111827",
                        opacity: 0.8,
                        fontSize: 20,
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 160ms ease",
                      }}
                    />
                  }
                  sx={{
                    px: { xs: 0.5, sm: 1 },
                    py: 0,
                    minHeight: 54,
                    "& .MuiAccordionSummary-content": {
                      margin: 0,
                      py: 1.6,
                    },
                    "&:hover": {
                      bgcolor: "rgba(91,47,232,0.03)", // super subtle hover
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: "#111827",
                      letterSpacing: 0.1,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {item.q}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    px: { xs: 0.5, sm: 1 },
                    pb: 2.1,
                    pt: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      color: "#374151",
                      lineHeight: 1.7,
                      maxWidth: "90%",
                    }}
                  >
                    {item.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
