import { Link } from 'lucide-react';
import React from 'react';

interface Mission {
  id: number;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  simulationType: 'bip' | 'fork' | 'historicalForks' | 'governance' | 'knowledge' | 'failedForks';
  unlocked: boolean;
  completed: boolean;
}

export const realm5Missions: Mission[] = [
  {
    id: 1,
    title: "The Proposal Path",
    subtitle: "Understanding Bitcoin Improvement Proposals (BIPs)",
    description: React.createElement("div", { className: "space-y-4" },
      // Mission Overview
      React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Mission Overview"),
        React.createElement("p", { className: "mb-4" }, 
          "Master Bitcoin's upgrade process through hands-on BIP simulations. Learn to navigate proposal drafting, community feedback, and activation mechanisms."
        ),
        React.createElement("div", { className: "grid md:grid-cols-2 gap-4" },
          React.createElement("div", null,
            React.createElement("h4", { className: "font-semibold mb-2" }, "Key Objectives"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Understand BIP lifecycle stages"),
              React.createElement("li", null, "Differentiate BIP types and purposes"),
              React.createElement("li", null, "Analyze real-world proposal impacts"),
              React.createElement("li", null, "Participate in governance processes")
            )
          ),
          React.createElement("div", null,
            React.createElement("h4", { className: "font-semibold mb-2" }, "Core Concepts"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Standards vs Informational BIPs"),
              React.createElement("li", null, "Soft fork activation mechanisms"),
              React.createElement("li", null, "Community consensus building"),
              React.createElement("li", null, "Protocol upgrade testing")
            )
          )
        )
      ),

      // Original Content
      React.createElement("p", null, 
        "Journey through Bitcoin's decentralized governance system. Learn how protocol upgrades are proposed, debated, and activated through community consensus."
      ),
      
      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Core Concepts"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("div", { className: "space-y-3" },
            React.createElement("p", null, 
              "BIPs are formalized suggestions for improving Bitcoin, first introduced in 2011 by Amir Taaki. They were inspired by Python's PEP system and provide a standardized way to propose changes to the Bitcoin protocol."),
            React.createElement("p", null, 
              "Each BIP is a technical document that follows specific formatting rules and includes sections like Abstract, Motivation, Specification, and Rationale."),
            React.createElement("p", null, 
              "BIPs follow three primary paths:"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, 
                React.createElement("strong", null, "Standards Track:"), 
                " Protocol changes that affect consensus rules (e.g., SegWit, Taproot), peer-to-peer communication, or API/RPC specifications"),
              React.createElement("li", null, 
                React.createElement("strong", null, "Informational:"), 
                " Educational documents, design issues, general guidelines, and information for the Bitcoin community"),
              React.createElement("li", null, 
                React.createElement("strong", null, "Process:"), 
                " Proposals to change processes surrounding Bitcoin, such as decision-making procedures or changes to the tools or environment used in Bitcoin development")
            ),
            React.createElement("p", { className: "pt-2" }, 
              "Unlike traditional software with centralized maintainers, no single entity controls Bitcoin upgrades - changes require broad community consensus. This makes Bitcoin much more challenging to modify than typical software projects, but also ensures its resistance to capture by special interests.")
          )
        )
      ),
  
      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Lifecycle & Activation"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("div", { className: "space-y-3" },
            React.createElement("h4", { className: "font-semibold" }, "5-Stage Evolution:"),
            React.createElement("ol", { className: "list-decimal pl-5 space-y-2" },
              React.createElement("li", null, 
                React.createElement("strong", null, "Draft:"), 
                " Initial proposal on Bitcoin Dev mailing list where the author introduces the idea and solicits feedback. The draft is submitted as a pull request to the BIPs GitHub repository."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Discussion:"), 
                " Community review on GitHub, forums, IRC channels, and in-person meetings. This is where technical concerns, security implications, and potential edge cases are addressed. This phase often involves multiple revisions to address feedback."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Testing:"), 
                " Implementation on test networks like Testnet or Signet. Developers build the proposed changes into actual code and test extensively for bugs, compatibility issues, and unintended consequences. This may include stress testing and adversarial scenarios."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Signaling:"), 
                " Miners and node operators show support through various mechanisms like BIP 9 version bits, UASF (User Activated Soft Fork), or Speedy Trial. This indicates readiness to adopt the change and helps coordinate network-wide upgrades."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Activation:"), 
                " Network-wide adoption threshold reached, after which the new rules become enforced. Different BIPs have different activation mechanisms, but most require a supermajority of mining power (usually 95%) to signal readiness before activation.")
            ),
            React.createElement("p", { className: "pt-2 text-sm opacity-75" }, 
              "Example: SegWit (BIP 141) took 2 years from initial proposal to activation, demonstrating Bitcoin's deliberate approach to protocol changes. The proposal was first discussed in December 2015, formalized in a BIP in early 2016, and finally activated in August 2017 after extensive debate and the BIP 148 UASF movement.")
          )
        )
      ),
  
      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Real-World Impact"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("div", { className: "grid gap-3 md:grid-cols-2" },
            React.createElement("div", null,
              React.createElement("h4", { className: "font-semibold mb-2" }, "User-Facing BIPs"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
                React.createElement("li", null, "BIP 39: 12/24-word backup phrases (mnemonic seeds) that make wallet backups human-friendly"),
                React.createElement("li", null, "BIP 32: Hierarchical Deterministic wallets that generate all keys from a single seed"),
                React.createElement("li", null, "BIP 44: Multi-account hierarchy for deterministic wallets"),
                React.createElement("li", null, "BIP 47: Reusable payment codes for enhanced privacy"),
                React.createElement("li", null, "BIP 21: URI scheme for Bitcoin payments (bitcoin: links)"),
                React.createElement("li", null, "BIP 70-73: Payment protocol for secure merchant interactions (now largely deprecated)"),
                React.createElement("li", null, "BIP 174: Partially Signed Bitcoin Transactions (PSBT) for hardware wallets and multisig")
              )
            ),
            React.createElement("div", null,
              React.createElement("h4", { className: "font-semibold mb-2" }, "Protocol-Level BIPs"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
                React.createElement("li", null, "BIP 141/143/144/145: SegWit capacity boost and transaction malleability fix"),
                React.createElement("li", null, "BIP 340-342: Taproot privacy and smart contract improvements"),
                React.createElement("li", null, "BIP 68/112/113: CheckSequenceVerify and relative timelocks"),
                React.createElement("li", null, "BIP 9: Version bits with timeout for soft fork deployment"),
                React.createElement("li", null, "BIP 152: Compact block relay to reduce network overhead"),
                React.createElement("li", null, "BIP 159: NODE_NETWORK_LIMITED service bit for pruned nodes"),
                React.createElement("li", null, "BIP 325: Signet test network with controlled difficulty"),
                React.createElement("li", null, "BIP 8: Version bits with lockout for soft fork deployment (post-SegWit improvement)"),
                React.createElement("li", null, "BIP 91: Reduced threshold activation for SegWit deployment")
              )
            )
          )
        )
      ),
  
      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Community Participation"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("div", { className: "space-y-3" },
            React.createElement("h4", { className: "font-semibold" }, "How to Get Involved:"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, 
                React.createElement("strong", null, "Learn:"), 
                " Study active BIPs at bips.dev and bitcoin.org/en/developer-reference. Track Bitcoin Core pull requests on GitHub to see how BIPs are implemented. The Bitcoin Optech newsletter provides excellent summaries of ongoing development."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Discuss:"), 
                " Join the Bitcoin-dev mailing list, attend Bitcoin Core developer meetings on IRC, and participate in Bitcoin Stack Exchange. 'Bitcoin Optech' YouTube workshops offer in-depth technical discussions of protocol changes."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Test:"), 
                " Experiment with BIPs on Signet or Testnet. Run a Signet node, test wallets with upcoming features, and report bugs. Consider joining testing efforts for upcoming soft forks."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Signal:"), 
                " Run a Bitcoin full node and upgrade to compatible software versions to signal support for changes. For miners, configure mining software to signal support for soft forks via version bits."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Propose:"), 
                " If you identify a potential improvement, draft a BIP following the template and process described in BIP 2. Building consensus requires clear communication, technical soundness, and patience.")
            ),
            React.createElement("div", { className: "mt-3 p-3 bg-purple-800/20 rounded-lg" },
              React.createElement("p", { className: "text-sm" }, 
                "Even non-developers can meaningfully participate by understanding proposals, running compatible nodes, testing on experimentation networks, and providing feedback on the user experience impact of proposed changes!")
            )
          )
        )
      )
    ),
    simulationType: 'bip',
    unlocked: true,
    completed: false
  },
  {
    id: 2,
    title: "Path of the Fork",
    subtitle: "Understanding Protocol Upgrade Mechanisms",
    description: React.createElement("div", { className: "space-y-4" },
      // Mission Overview
      React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Mission Overview"),
        React.createElement("p", { className: "mb-4" }, 
          "Navigate Bitcoin's evolutionary crossroads through network forks - critical events where protocol changes create chain divergences, shaping Bitcoin's development trajectory."
        ),
        React.createElement("div", { className: "grid md:grid-cols-2 gap-4" },
          React.createElement("div", null,
            React.createElement("h4", { className: "font-semibold mb-2" }, "Key Objectives"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Differentiate soft/hard forks"),
              React.createElement("li", null, "Analyze fork impacts"),
              React.createElement("li", null, "Coordinate activations"),
              React.createElement("li", null, "Manage chain splits")
            )
          ),
          React.createElement("div", null,
            React.createElement("h4", { className: "font-semibold mb-2" }, "Core Concepts"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Backward compatibility"),
              React.createElement("li", null, "Miner signaling"),
              React.createElement("li", null, "Replay protection"),
              React.createElement("li", null, "Economic impacts")
            )
          )
        )
      ),

      // Original Content
      React.createElement("p", null, 
        "Navigate Bitcoin's evolutionary crossroads through network forks - critical events where protocol changes create chain divergences, shaping Bitcoin's development trajectory. Understanding forks is essential to grasping Bitcoin's governance model."
      ),
  
      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Fork Fundamentals"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("div", { className: "grid md:grid-cols-2 gap-4" },
            React.createElement("div", null,
              React.createElement("h4", { className: "font-semibold mb-2" }, "Soft Forks"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
                React.createElement("li", null, "Backward-compatible rule tightening that restricts the set of valid transactions"),
                React.createElement("li", null, "Unupgraded nodes still accept blocks from upgraded nodes (one-way compatibility)"),
                React.createElement("li", null, "Activation typically requires 95% miner signaling via BIP9 versioning system"),
                React.createElement("li", null, "Old nodes remain on the same chain but may miss validating some new rules"),
                React.createElement("li", null, "Examples: P2SH (BIP16), CLTV (BIP65), CSV (BIP68/112/113), SegWit (BIP141-143), Taproot (BIP340-342)")
              )
            ),
            React.createElement("div", null,
              React.createElement("h4", { className: "font-semibold mb-2" }, "Hard Forks"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
                React.createElement("li", null, "Non-compatible rule changes that expand the set of valid transactions"),
                React.createElement("li", null, "Unupgraded nodes reject blocks from upgraded nodes (no compatibility)"),
                React.createElement("li", null, "Creates permanent chain split unless 100% of economic nodes upgrade"),
                React.createElement("li", null, "Results in two separate currencies if economically significant groups follow each chain"),
                React.createElement("li", null, "Examples: Bitcoin Cash (8MB blocks), Bitcoin SV (128MB blocks), Bitcoin Gold (equihash PoW)")
              )
            )
          ),
          React.createElement("div", { className: "mt-4" },
            React.createElement("h4", { className: "font-semibold mb-2" }, "Technical Distinctions:"),
            React.createElement("p", null, "At a technical level, forks involve changes to Bitcoin's consensus rules, which include:"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Block validity rules (size, weight, transaction count)"),
              React.createElement("li", null, "Transaction validity rules (signature checks, script operations)"),
              React.createElement("li", null, "Block reward and issuance schedule"),
              React.createElement("li", null, "Proof-of-work algorithm and difficulty adjustment"),
              React.createElement("li", null, "Data structure formats and cryptographic primitives")
            ),
            React.createElement("p", { className: "mt-2" }, 
              "Bitcoin developers strongly prefer soft forks over hard forks because they maintain network compatibility and don't force users to upgrade, preserving Bitcoin's voluntary and permissionless nature.")
          )
        )
      ),
  
      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Activation Mechanisms"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("div", { className: "space-y-3" },
            React.createElement("h4", { className: "font-semibold" }, "Consensus Building Methods"),
            React.createElement("ol", { className: "list-decimal pl-5 space-y-3" },
              React.createElement("li", null, 
                React.createElement("strong", null, "Miner Signaling (BIP9):"), 
                " Miners set bits in block version number to indicate readiness for activation. This method was used for SegWit and requires typically 95% of blocks in a 2,016 block period to signal support. It includes a timeout period (typically 1 year) after which the proposal expires if not activated."),
              React.createElement("li", null, 
                React.createElement("strong", null, "User Activated Soft Fork (UASF):"), 
                " Node operators coordinate to enforce new rules on a specific date, regardless of miner support. BIP148 was a UASF that ultimately pressured miners to signal for SegWit. This approach emphasizes that miners should follow economic incentives set by users and businesses."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Miner Activated Soft Fork (MASF):"), 
                " Traditional approach where miners trigger activation upon reaching a threshold of hashing power. Used for early soft forks like P2SH and CLTV before BIP9 standardized the process."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Speedy Trial:"), 
                " A time-limited activation window (typically 3 months) with a lower threshold (90% instead of 95%). If threshold is met, activation occurs after a delay period. If not met, the deployment expires. This was used for Taproot activation as a compromise between UASF advocates and those preferring miner coordination."),
              React.createElement("li", null, 
                React.createElement("strong", null, "BIP8 with Forced Activation:"), 
                " A modification of BIP9 that includes a mandatory activation after the timeout period if the threshold wasn't previously reached. This combines elements of UASF with miner signaling, ensuring eventual activation while giving miners a chance to coordinate."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Flag Day:"), 
                " The earliest activation method where a change activates at a predetermined block height or timestamp. Simple but offers no method to abort if problems are discovered late in the process.")
            ),
            React.createElement("div", { className: "mt-3 p-3 bg-purple-800/20 rounded-lg" },
              React.createElement("p", { className: "text-sm" }, 
                "The evolution of activation mechanisms reflects Bitcoin's maturation as a protocol and growing understanding of its governance dynamics. Each mechanism balances coordination efficiency against the risk of contentious changes.")
            )
          )
        )
      ),
  
      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Network Impacts"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("div", { className: "grid gap-4 md:grid-cols-2" },
            React.createElement("div", null,
              React.createElement("h4", { className: "font-semibold mb-2" }, "Protocol-Level Changes"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
                React.createElement("li", null, "Block size/weight adjustments affect transaction throughput and fee markets"),
                React.createElement("li", null, "Consensus rule modifications change validation criteria for all nodes"),
                React.createElement("li", null, "New script opcodes enable advanced smart contracts"),
                React.createElement("li", null, "Cryptographic primitive updates enhance security and privacy"),
                React.createElement("li", null, "Signature schemes affect transaction malleability and multi-signature capabilities"),
                React.createElement("li", null, "Witness discount rates impact economic incentives for certain transaction types")
              )
            ),
            React.createElement("div", null,
              React.createElement("h4", { className: "font-semibold mb-2" }, "User Impacts"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
                React.createElement("li", null, "Wallet compatibility issues when new transaction formats are introduced"),
                React.createElement("li", null, "Coin duplication after contentious chain splits creates claiming risks"),
                React.createElement("li", null, "Network security considerations when hash power divides between chains"),
                React.createElement("li", null, "Privacy implications when using coins on multiple fork chains"),
                React.createElement("li", null, "Fee market dynamics change with capacity adjustments"),
                React.createElement("li", null, "New capabilities become available (e.g., Lightning Network after SegWit)")
              )
            )
          ),
          React.createElement("div", { className: "mt-4" },
            React.createElement("h4", { className: "font-semibold mb-2" }, "Economic Implications:"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Market value redistribution between competing chains"),
              React.createElement("li", null, "Exchange listing policies impact liquidity of fork coins"),
              React.createElement("li", null, "Brand confusion can occur when multiple chains claim the Bitcoin name"),
              React.createElement("li", null, "Network effect dilution when communities split between chains"),
              React.createElement("li", null, "Merchant and service provider adoption varies between forks"),
              React.createElement("li", null, "Tax and regulatory considerations differ for fork coins")
            )
          )
        )
      ),
  
      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Historical Case Studies"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("div", { className: "space-y-3" },
            React.createElement("h4", { className: "font-semibold" }, "Notable Chain Splits"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-3" },
              React.createElement("li", null, 
                React.createElement("strong", null, "Bitcoin Cash (2017):"), 
                " Emerged from the scaling debates as an 8MB block size alternative to SegWit. Led by Roger Ver, Jihan Wu, and Craig Wright initially, BCH implemented Emergency Difficulty Adjustment, rejected Replace-by-Fee, and removed SegWit compatibility. It has since undergone several contentious hard forks of its own."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Taproot (2021):"), 
                " A successful soft fork that enhanced Bitcoin's smart contract capabilities while improving privacy. Activated via Speedy Trial with minimal controversy, it represented a maturation of Bitcoin's governance process with lessons applied from the SegWit activation challenges."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Bitcoin SV (2018):"), 
                " Split from Bitcoin Cash with a goal of 128MB blocks and script restoration to enable complex on-chain applications. Led by Craig Wright and Calvin Ayre, BSV aimed to restore Satoshi's 'original vision' but has faced challenges including exchange delistings and network attacks."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Bitcoin Gold (2017):"), 
                " Hard fork that changed Bitcoin's proof-of-work algorithm from SHA-256 to Equihash to enable GPU mining instead of ASIC mining. Aimed to 'democratize' mining but has struggled with 51% attacks due to lower security budget."),
              React.createElement("li", null, 
                React.createElement("strong", null, "P2SH Soft Fork (2012):"), 
                " One of Bitcoin's earliest significant upgrades, adding Pay-to-Script-Hash functionality which enabled multi-signature wallets and more complex scripts. Relatively smooth activation demonstrated Bitcoin's ability to upgrade consensually.")
            ),
            React.createElement("div", { className: "mt-3 p-3 bg-purple-800/20 rounded-lg" },
              React.createElement("p", { className: "text-sm" }, 
                "Each fork event has contributed valuable lessons to Bitcoin's governance processes. Successful soft forks have built on previous experiences, while contentious hard forks have demonstrated the economic consequences of community division.")
            )
          )
        )
      )
    ),
    simulationType: 'fork',
    unlocked: true,
    completed: false
  },
  {
    id: 3,
    title: "Historic Forks: Bitcoin's Evolution",
    subtitle: "Learning from Bitcoin's Major Protocol Changes",
    description: React.createElement("div", { className: "space-y-4" },
      // Mission Overview
      React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Mission Overview"),
        React.createElement("p", { className: "mb-4" }, 
          "Explore pivotal moments in Bitcoin's history where protocol changes shaped its technical and social landscape. These historical events provide essential context for understanding Bitcoin's governance approach."
        ),
        React.createElement("div", { className: "grid md:grid-cols-2 gap-4" },
          React.createElement("div", null,
            React.createElement("h4", { className: "font-semibold mb-2" }, "Key Objectives"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Analyze historical fork events"),
              React.createElement("li", null, "Understand governance lessons"),
              React.createElement("li", null, "Evaluate technical implementations"),
              React.createElement("li", null, "Assess market impacts")
            )
          ),
          React.createElement("div", null,
            React.createElement("h4", { className: "font-semibold mb-2" }, "Core Concepts"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Consensus rule changes"),
              React.createElement("li", null, "Economic incentives"),
              React.createElement("li", null, "Community coordination"),
              React.createElement("li", null, "Network effects")
            )
          )
        )
      ),

      // Original Content
      React.createElement("p", null, 
        "Explore pivotal moments in Bitcoin's history where protocol changes shaped its technical and social landscape. These historical events provide essential context for understanding Bitcoin's governance approach."
      ),
      
      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Major Hard Forks"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("div", { className: "space-y-6" },
            React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
              React.createElement("h4", { className: "font-semibold mb-2" }, "Bitcoin Cash (2017)"),
              React.createElement("p", null, "Contentious hard fork emerging from the scaling debates:"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-1" },
                React.createElement("li", null, "8MB → 32MB block size increase to support more transactions per block"),
                React.createElement("li", null, "Emergency Difficulty Adjustment (EDA) to ensure chain survival with minority hash power"),
                React.createElement("li", null, "Rejected SegWit implementation in favor of simple block size increase"),
                React.createElement("li", null, "Resulted in BCH cryptocurrency with separate market value and development roadmap"),
                React.createElement("li", null, "Led by Roger Ver, Jihan Wu (Bitmain), and initially Craig Wright"),
                React.createElement("li", null, "Activated on August 1, 2017 at block height 478,558"),
                React.createElement("li", null, "Included replay protection to prevent transaction duplication across chains"),
                React.createElement("li", null, "Emphasized on-chain scaling instead of second-layer solutions")
              )
            ),
            
            React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
              React.createElement("h4", { className: "font-semibold mb-2" }, "Bitcoin SV (2018)"),
              React.createElement("p", null, "Further split from Bitcoin Cash during 'hash war':"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-1" },
                React.createElement("li", null, "128MB block size target with plans for gigabyte blocks"),
                React.createElement("li", null, "Restored original script opcodes to enable more complex on-chain applications"),
                React.createElement("li", null, "Craig Wright's 'Satoshi Vision' claims drove philosophical direction"),
                React.createElement("li", null, "Hash war with Bitcoin ABC client led to significant industry disruption"),
                React.createElement("li", null, "Removed transaction ordering rules introduced in BCH"),
                React.createElement("li", null, "Forked on November 15, 2018 at Bitcoin Cash block height 556,766"),
                React.createElement("li", null, "Backed by Calvin Ayre's CoinGeek mining operation"),
                React.createElement("li", null, "Subsequent exchange delistings due to legal threats and network attacks"),
                React.createElement("li", null, "Emphasized on-chain data storage enabling 'metanet' applications")
              )
            ),
            
            React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
              React.createElement("h4", { className: "font-semibold mb-2" }, "Bitcoin Gold (2017)"),
              React.createElement("p", null, "Hard fork focused on mining decentralization:"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-1" },
                React.createElement("li", null, "Changed PoW algorithm from SHA-256 to Equihash to prevent ASIC mining"),
                React.createElement("li", null, "Aimed to restore 'GPU mining' for more distributed participation"),
                React.createElement("li", null, "Included replay protection and unique address format"),
                React.createElement("li", null, "Premine controversy with 100,000 BTG for development fund"),
                React.createElement("li", null, "Suffered multiple 51% attacks due to lower security budget"),
                React.createElement("li", null, "Forked on October 24, 2017 at Bitcoin block height 491,407"),
                React.createElement("li", null, "Led by Jack Liao of LightningASIC with development team 'h4x3rotab'"),
                React.createElement("li", null, "Initial launch issues including security vulnerabilities")
              )
            )
          )
        )
      ),
      
      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 mt-4 text-purple-400" }, "Major Soft Forks"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("div", { className: "space-y-6" },
            React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
              React.createElement("h4", { className: "font-semibold mb-2" }, "SegWit (2017)"),
              React.createElement("p", null, "Segregated Witness - a transformative soft fork:"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-1" },
                React.createElement("li", null, "Moved signature data outside traditional block structure"),
                React.createElement("li", null, "Fixed transaction malleability, enabling Lightning Network"),
                React.createElement("li", null, "Increased block capacity through witness discount (effective 2-4MB)"),
                React.createElement("li", null, "Complex activation through BIP9, BIP148 UASF, and BIP91"),
                React.createElement("li", null, "Originally proposed by Pieter Wuille in December 2015"),
                React.createElement("li", null, "Activated on August 24, 2017 at block height 481,824"),
                React.createElement("li", null, "Implemented as BIPs 141, 143, 144, and 145"),
                React.createElement("li", null, "Faced opposition leading to Bitcoin Cash hard fork"),
                React.createElement("li", null, "Gradual adoption with 85% transaction usage by 2023")
              )
            ),
            
            React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
              React.createElement("h4", { className: "font-semibold mb-2" }, "Taproot (2021)"),
              React.createElement("p", null, "Privacy and smart contract enhancement:"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-1" },
                React.createElement("li", null, "Introduced Schnorr signatures for improved multi-signature efficiency"),
                React.createElement("li", null, "Enabled complex smart contracts to look like regular transactions"),
                React.createElement("li", null, "Enhanced privacy for Lightning and multi-signature wallets"),
                React.createElement("li", null, "Activated via 'Speedy Trial' with 90% miner signaling threshold"),
                React.createElement("li", null, "Proposed by Gregory Maxwell and implemented by Pieter Wuille"),
                React.createElement("li", null, "Activated on November 14, 2021 at block height 709,632"),
                React.createElement("li", null, "Implemented as BIPs 340 (Schnorr), 341 (Taproot), and 342 (Tapscript)"),
                React.createElement("li", null, "Achieved broad community consensus with minimal controversy"),
                React.createElement("li", null, "Created foundation for future upgrades like MAST and Graftroot")
              )
            ),
            
            React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
              React.createElement("h4", { className: "font-semibold mb-2" }, "P2SH (2012)"),
              React.createElement("p", null, "Pay-to-Script-Hash early protocol enhancement:"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-1" },
                React.createElement("li", null, "Enabled complex spending conditions with simple payment addresses"),
                React.createElement("li", null, "Made multi-signature wallets practical for general use"),
                React.createElement("li", null, "Shifted burden of providing script from sender to recipient"),
                React.createElement("li", null, "Activated via 55% miner support threshold"),
                React.createElement("li", null, "Proposed by Gavin Andresen as BIP 16"),
                React.createElement("li", null, "Activated on April 1, 2012 at block height 173,805"),
                React.createElement("li", null, "Competed with BIP 17 (OP_EVAL) alternative implementation"),
                React.createElement("li", null, "One of Bitcoin's earliest successful soft forks"),
                React.createElement("li", null, "Set precedent for address-based script encapsulation")
              )
            )
          )
        )
      )
    ),
    simulationType: 'historicalForks',
    unlocked: true,
    completed: false
  },
  {
    id: 4,
    title: "The Governance Game",
    subtitle: "Understanding Bitcoin's Decision-Making",
    description: React.createElement("div", { className: "space-y-4" },
      // Mission Overview
      React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Mission Overview"),
        React.createElement("p", { className: "mb-4" }, 
          "Discover Bitcoin's unique governance model - a decentralized system balancing protocol rules, market forces, and community consensus. Unlike traditional organizations, Bitcoin operates without formal leadership structures while maintaining protocol security and evolution."
        ),
        React.createElement("div", { className: "grid md:grid-cols-2 gap-4" },
          React.createElement("div", null,
            React.createElement("h4", { className: "font-semibold mb-2" }, "Key Objectives"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Understand governance layers"),
              React.createElement("li", null, "Analyze stakeholder roles"),
              React.createElement("li", null, "Evaluate decision processes"),
              React.createElement("li", null, "Simulate consensus building")
            )
          ),
          React.createElement("div", null,
            React.createElement("h4", { className: "font-semibold mb-2" }, "Core Concepts"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Code is law"),
              React.createElement("li", null, "Skin in the game"),
              React.createElement("li", null, "Rough consensus"),
              React.createElement("li", null, "Ossification")
            )
          )
        )
      ),

      // Original Content
      React.createElement("p", null,
        "Discover Bitcoin's unique governance model - a decentralized system balancing protocol rules, market forces, and community consensus. Unlike traditional organizations, Bitcoin operates without formal leadership structures while maintaining protocol security and evolution."
      ),
      
      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Core Principles"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
            React.createElement("li", null,
              React.createElement("strong", null, "No Formal Governance:"),
              " Bitcoin has no CEO, board of directors, or voting shares. There is no central authority that can unilaterally make decisions about the protocol. This distinguishes it from corporate entities, foundations, and even most other cryptocurrencies."
            ),
            React.createElement("li", null,
              React.createElement("strong", null, "Code is Law:"),
              " The rules encoded in the Bitcoin protocol are enforced by thousands of independent nodes. Any transaction that follows these consensus rules is valid, regardless of external factors. This creates a predictable system where rules are applied impartially."
            ),
            React.createElement("li", null,
              React.createElement("strong", null, "Skin in the Game:"),
              " Influence in the Bitcoin ecosystem is generally proportional to economic investment. Miners invest in expensive hardware and electricity, developers contribute time and expertise, users and businesses commit capital. This alignment of incentives helps prevent capture by special interests."
            ),
            React.createElement("li", null,
              React.createElement("strong", null, "Exit over Voice:"),
              " In Albert Hirschman's framework, Bitcoin emphasizes 'exit' (choosing which implementation to run) over 'voice' (voting within a system). This creates strong guarantees against unwanted changes, as users can simply continue using software that enforces rules they agree with."
            ),
            React.createElement("li", null,
              React.createElement("strong", null, "Ossification:"),
              " Over time, Bitcoin becomes more resistant to change as its economic footprint grows. This increasing conservatism is a feature that enhances Bitcoin's reliability as a monetary system, similar to how internet protocols like TCP/IP have stabilized."
            ),
            React.createElement("li", null,
              React.createElement("strong", null, "Rough Consensus:"),
              " When changes are necessary, Bitcoin adopts the Internet Engineering Task Force (IETF) principle of 'rough consensus' rather than formal voting. This prioritizes technical merit and broad agreement over simple majority rule."
            )
          ),
          React.createElement("div", { className: "mt-3 p-3 bg-purple-800/20 rounded-lg" },
            React.createElement("p", { className: "text-sm" }, 
              "The apparent 'leaderlessness' of Bitcoin is intentional - it creates a system resistant to capture by individuals, corporations, or governments, ensuring Bitcoin's core properties remain intact despite external pressures."
            )
          )
        )
      ),

      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Key Stakeholders"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("div", { className: "grid md:grid-cols-2 gap-4" },
            React.createElement("div", null,
              React.createElement("h4", { className: "font-semibold mb-2" }, "Technical Influence"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
                React.createElement("li", null, 
                  React.createElement("strong", null, "Core Developers:"), 
                  " Maintain the Bitcoin Core reference implementation. Their influence comes from technical expertise and merit-based contributions, not formal authority. Key figures include Wladimir van der Laan (lead maintainer), Pieter Wuille, Andrew Chow, and Gloria Zhao."),
                React.createElement("li", null, 
                  React.createElement("strong", null, "BIP Authors:"), 
                  " Anyone can propose Bitcoin Improvement Proposals, but those with established reputations and technical credibility have greater chances of their proposals being accepted. The BIP editor (currently Luke Dashjr) manages the formal process."),
                React.createElement("li", null, 
                  React.createElement("strong", null, "Security Researchers:"), 
                  " Identify vulnerabilities and evaluate proposal security implications. Organizations like ChainCode Labs, Blockstream, and academic institutions contribute significantly to Bitcoin's security research."),
                React.createElement("li", null, 
                  React.createElement("strong", null, "Alternative Implementations:"), 
                  " Teams maintaining non-Core implementations like btcd, libbitcoin, and bcoin provide important checks and balances on Core development decisions.")
              )
            ),
            React.createElement("div", null,
              React.createElement("h4", { className: "font-semibold mb-2" }, "Economic Influence"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
                React.createElement("li", null, 
                  React.createElement("strong", null, "Miners:"), 
                  " Signal support for protocol changes through block version bits and hashpower allocation. Mining pools like F2Pool, Foundry, and AntPool represent significant hashpower concentrations, but individual miners can switch pools if they disagree with policy decisions."),
                React.createElement("li", null, 
                  React.createElement("strong", null, "Node Operators:"), 
                  " Collectively enforce consensus rules by validating transactions and blocks. Running full nodes is the most direct way users participate in governance, as nodes determine which rules are actually enforced regardless of miner preferences."),
                React.createElement("li", null, 
                  React.createElement("strong", null, "Exchanges:"), 
                  " Decide which fork to list as 'BTC' and how to handle chain splits. Major platforms like Coinbase, Binance, and Kraken have significant influence on liquidity and price discovery during contentious events."),
                React.createElement("li", null, 
                  React.createElement("strong", null, "Large Holders:"), 
                  " Entities with substantial bitcoin holdings can influence markets through buying, selling, or public statements. This includes corporations like MicroStrategy, investment funds, early adopters, and even national governments.")
              )
            )
          ),
          React.createElement("div", { className: "mt-4" },
            React.createElement("h4", { className: "font-semibold mb-2" }, "Social Influence"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, 
                React.createElement("strong", null, "Bitcoin Media:"), 
                " Publications, podcasts, and conferences shape narrative and information flow. Examples include Bitcoin Magazine, What Bitcoin Did podcast, and the Baltic Honeybadger conference."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Educational Organizations:"), 
                " Groups like Chaincode Labs, Brink, Qala, and Summer of Bitcoin train new developers and expand the technical community."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Respected Voices:"), 
                " Individual thought leaders with large followings can influence public opinion on proposals. Their influence is based on reputation and trust rather than formal authority."),
              React.createElement("li", null, 
                React.createElement("strong", null, "Businesses & Services:"), 
                " Wallet providers, payment processors, and Bitcoin-focused companies implement changes that affect user experience and can signal support or opposition to protocol changes.")
            )
          ),
          React.createElement("div", { className: "mt-3 p-3 bg-purple-800/20 rounded-lg" },
            React.createElement("p", { className: "text-sm" }, 
              "Bitcoin's multi-stakeholder governance creates checks and balances that prevent any single group from controlling the protocol. Every participant must persuade rather than command, creating a robust consensus-building process."
            )
          )
        )
      )
    ),
    simulationType: 'governance',
    unlocked: false,
    completed: false
  },
  {
    id: 5,
    title: "Governance in Action",
    subtitle: "Practical Decision-Making Scenarios",
    description: React.createElement("div", { className: "space-y-4" },
      // Mission Overview
      React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Mission Overview"),
        React.createElement("p", { className: "mb-4" }, 
          "Apply your knowledge through realistic governance scenarios and decision-making challenges. These practical exercises will help you understand the complexities of Bitcoin's governance by engaging with actual stakeholder dynamics and technical trade-offs."
        ),
        React.createElement("div", { className: "grid md:grid-cols-2 gap-4" },
          React.createElement("div", null,
            React.createElement("h4", { className: "font-semibold mb-2" }, "Key Objectives"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Evaluate protocol proposals"),
              React.createElement("li", null, "Navigate consensus building"),
              React.createElement("li", null, "Coordinate stakeholders"),
              React.createElement("li", null, "Manage emergencies")
            )
          ),
          React.createElement("div", null,
            React.createElement("h4", { className: "font-semibold mb-2" }, "Core Concepts"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Economic signaling"),
              React.createElement("li", null, "Risk assessment"),
              React.createElement("li", null, "Conflict resolution"),
              React.createElement("li", null, "Coordination mechanisms")
            )
          )
        )
      ),

      // Original Content
      React.createElement("p", null,
        "Apply your knowledge through realistic governance scenarios and decision-making challenges. These practical exercises will help you understand the complexities of Bitcoin's governance by engaging with actual stakeholder dynamics and technical trade-offs."
      ),
      
      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Interactive Scenarios"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("div", { className: "space-y-3" },
            React.createElement("h4", { className: "font-semibold" }, "Protocol Upgrade Proposals"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Evaluate technical merits of proposed changes"),
              React.createElement("li", null, "Analyze security implications and potential vulnerabilities"),
              React.createElement("li", null, "Assess backward compatibility requirements"),
              React.createElement("li", null, "Develop activation strategies for smooth deployment")
            ),
            React.createElement("h4", { className: "font-semibold mt-3" }, "Consensus Building"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Navigate complex agreement processes among diverse stakeholders"),
              React.createElement("li", null, "Communicate technical concepts to non-technical participants"),
              React.createElement("li", null, "Identify common ground and develop compromise solutions"),
              React.createElement("li", null, "Address core concerns while maintaining protocol integrity")
            ),
            React.createElement("h4", { className: "font-semibold mt-3" }, "Stakeholder Coordination"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Coordinate activation across miners, exchanges, and users"),
              React.createElement("li", null, "Develop signaling mechanisms for readiness"),
              React.createElement("li", null, "Balance needs of different ecosystem participants"),
              React.createElement("li", null, "Ensure network security during transitions")
            ),
            React.createElement("h4", { className: "font-semibold mt-3" }, "Emergency Response"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Respond to critical security vulnerabilities"),
              React.createElement("li", null, "Manage chain splits and network attacks"),
              React.createElement("li", null, "Practice responsible disclosure procedures"),
              React.createElement("li", null, "Balance transparency with security considerations")
            )
          )
        )
      )
    ),
    simulationType: 'knowledge',
    unlocked: true,
    completed: false
  },
  {
    id: 6,
    title: "Learning from Failures",
    subtitle: "Historical Fork Case Studies",
    description: React.createElement("div", { className: "space-y-4" },
      // Mission Overview
      React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Mission Overview"),
        React.createElement("p", { className: "mb-4" }, 
          "Examine Bitcoin's failed fork attempts to understand the governance, technical, and community dynamics that determine the success or failure of protocol changes. These historical events provide crucial insights into Bitcoin's resilience and evolutionary mechanisms."
        ),
        React.createElement("div", { className: "grid md:grid-cols-2 gap-4" },
          React.createElement("div", null,
            React.createElement("h4", { className: "font-semibold mb-2" }, "Key Objectives"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Identify failure patterns"),
              React.createElement("li", null, "Analyze governance missteps"),
              React.createElement("li", null, "Evaluate technical flaws"),
              React.createElement("li", null, "Extract security lessons")
            )
          ),
          React.createElement("div", null,
            React.createElement("h4", { className: "font-semibold mb-2" }, "Core Concepts"),
            React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
              React.createElement("li", null, "Consensus bugs"),
              React.createElement("li", null, "Activation failures"),
              React.createElement("li", null, "Economic incentives"),
              React.createElement("li", null, "Community coordination")
            )
          )
        )
      ),

      // Original Content
      React.createElement("p", null,
        "Examine Bitcoin's failed fork attempts to understand the governance, technical, and community dynamics that determine the success or failure of protocol changes. These historical events provide crucial insights into Bitcoin's resilience and evolutionary mechanisms."
      ),
      
      React.createElement("div", null,
        React.createElement("h3", { className: "text-xl font-semibold mb-2 text-purple-400" }, "Failed Fork Analysis"),
        React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
          React.createElement("div", { className: "space-y-6" },
            React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
              React.createElement("h4", { className: "font-semibold mb-2" }, "SegWit2x (2017)"),
              React.createElement("p", null, "A controversial scaling proposal that ultimately failed:"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
                React.createElement("li", null, "New York Agreement Context: Closed-door meeting between major industry players in May 2017"),
                React.createElement("li", null, "Technical Implementation: BTC1 client maintained by Jeff Garzik"),
                React.createElement("li", null, "Community Resistance: Strong opposition from technical experts and users"),
                React.createElement("li", null, "Critical Bug: Consensus bug discovered days before activation"),
                React.createElement("li", null, "Rapid Collapse: Key signatories withdrew support in November 2017")
              )
            ),
            
            React.createElement("div", { className: "bg-purple-900/30 p-4 rounded-xl" },
              React.createElement("h4", { className: "font-semibold mb-2" }, "Bitcoin XT & Classic"),
              React.createElement("p", null, "Early block size increase attempts:"),
              React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
                React.createElement("li", null, "Bitcoin XT (2015): 8MB blocks via BIP 101"),
                React.createElement("li", null, "Bitcoin Classic (2016): 2MB block size proposal"),
                React.createElement("li", null, "Development Approach Issues: Controversial feature additions"),
                React.createElement("li", null, "Community Division: Polarization and communication breakdowns")
              )
            )
          )
        )
      )
    ),
    simulationType: 'failedForks',
    unlocked: true,
    completed: false
  }
];