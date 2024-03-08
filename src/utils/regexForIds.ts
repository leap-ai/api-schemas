function generateRegex(prefix: string, length: number) {
  return new RegExp(`^${prefix}_[a-zA-Z0-9]{${length}}$`);
}

function getErrorMessage(prefix: string): string {
  return `Invalid ID. Make sure you're using an ID which starts with '${prefix}_'.`;
}

export const RegexForIds = {
  actionDraftRunsId: {
    regex: generateRegex("ard", 24),
    errorMessage: getErrorMessage("ard"),
    example: "ard_G1orll1DzVPZRo41cuKqO1p7",
  },
  actionPublishedRunsId: {
    regex: generateRegex("arp", 24),
    errorMessage: getErrorMessage("arp"),
    example: "arp_e3QQiMGDbv6Ao2YqznuPujCF",
  },
  apiKeysId: {
    regex: generateRegex("api", 24),
    errorMessage: getErrorMessage("api"),
    example: "api_RzO25gMyVS3ZgmOnlj8hFlm4",
  },
  organizationPermissionsId: {
    regex: generateRegex("orgp", 14),
    errorMessage: getErrorMessage("orgp"),
    example: "orgp_G4wpP2RivGWcNk",
  },
  actionsDraftId: {
    regex: generateRegex("acd", 18),
    errorMessage: getErrorMessage("acd"),
    example: "acd_lEGmkXm2XMjuASNxCY",
  },
  actionsPublishedId: {
    regex: generateRegex("acp", 18),
    errorMessage: getErrorMessage("acp"),
    example: "acp_z0MliQUEIXScQZ",
  },
  versionsDraftId: {
    regex: generateRegex("vsd", 14),
    errorMessage: getErrorMessage("vsd"),
    example: "vsd_yisY1Nox3wQ6TO",
  },
  versionsPublishedId: {
    regex: generateRegex("vsp", 14),
    errorMessage: getErrorMessage("vsp"),
    example: "vsp_lbF7B4rveDNQbb",
  },
  workflowDraftRunsId: {
    regex: generateRegex("rnd", 18),
    errorMessage: getErrorMessage("rnd"),
    example: "rnd_bF9O9YTzG8hEU00o0V",
  },
  workflowPublishedRunsId: {
    regex: generateRegex("rnp", 18),
    errorMessage: getErrorMessage("rnp"),
    example: "rnp_cVa3GFiUwV8pR8mr3F",
  },
  workflowsId: {
    regex: generateRegex("wkf", 14),
    errorMessage: getErrorMessage("wkf"),
    example: "wkf_iWTsaL7xSPNned",
  },
  organizationsId: {
    regex: generateRegex("org", 14),
    errorMessage: getErrorMessage("org"),
    example: "org_ANmdJqlYaczwI0",
  },
  bulkRunId: {
    regex: generateRegex("bulk", 24),
    errorMessage: getErrorMessage("bulk"),
    example: "bulk_hdZB4xJAjDxDtjo8MaVmUDi3",
  },
};
