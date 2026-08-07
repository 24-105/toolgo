export type VlsmAllocation = {
  request: number;
  prefix: number;
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  usableHosts: number;
  addresses: number;
};

export type VlsmPlan = {
  inputNetwork: string;
  network: string;
  prefix: number;
  totalAddresses: number;
  remainingAddresses: number;
  allocations: VlsmAllocation[];
};

export const MAX_REQUESTS = 64;

function parseIpv4(value: string) {
  const parts = value.trim().split(".");
  if (parts.length !== 4 || parts.some((part) => !/^\d+$/u.test(part))) {
    throw new Error("IPv4アドレスを正しく入力してください。");
  }
  const octets = parts.map(Number);
  if (octets.some((octet) => octet < 0 || octet > 255)) {
    throw new Error("IPv4アドレスの各数値は0〜255で指定してください。");
  }
  return octets.reduce((total, octet) => total * 256 + octet, 0);
}

function formatIpv4(value: number) {
  return [
    Math.floor(value / 16_777_216) % 256,
    Math.floor(value / 65_536) % 256,
    Math.floor(value / 256) % 256,
    value % 256,
  ].join(".");
}

function maskForPrefix(prefix: number) {
  return prefix === 0 ? 0 : 4_294_967_295 - (2 ** (32 - prefix) - 1);
}

function parseCidr(value: string) {
  const parts = value.trim().split("/");
  if (parts.length !== 2 || !/^\d+$/u.test(parts[1])) {
    throw new Error("ネットワークは「192.168.0.0/24」の形式で入力してください。");
  }
  const prefix = Number(parts[1]);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    throw new Error("CIDRのプレフィックス長は0〜32で指定してください。");
  }
  const address = parseIpv4(parts[0]);
  const mask = maskForPrefix(prefix);
  const network = Math.floor(address / 1) & mask;
  return {
    input: `${formatIpv4(address)}/${prefix}`,
    network: network >>> 0,
    prefix,
    totalAddresses: 2 ** (32 - prefix),
  };
}

function prefixForHosts(hosts: number) {
  if (!Number.isInteger(hosts) || hosts < 1 || hosts > 4_294_967_294) {
    throw new Error("必要なホスト数は1〜4,294,967,294の整数で指定してください。");
  }
  const requiredAddresses = hosts + 2;
  let addresses = 1;
  let prefix = 32;
  while (addresses < requiredAddresses) {
    addresses *= 2;
    prefix -= 1;
  }
  return { prefix: Math.min(prefix, 30), addresses: Math.max(addresses, 4) };
}

export function parseHostCounts(value: string) {
  const counts = value
    .split(/[\s,、]+/u)
    .filter(Boolean)
    .map(Number);
  if (counts.length === 0) throw new Error("必要なホスト数を1つ以上入力してください。");
  if (counts.length > MAX_REQUESTS) {
    throw new Error(`ホスト数は${MAX_REQUESTS}個まで入力できます。`);
  }
  if (counts.some((count) => !Number.isInteger(count) || count < 1)) {
    throw new Error("必要なホスト数は1以上の整数で入力してください。");
  }
  return counts;
}

export function planVlsm(networkInput: string, hostCountsInput: string): VlsmPlan {
  const parsed = parseCidr(networkInput);
  const hostCounts = parseHostCounts(hostCountsInput);
  const requests = hostCounts
    .map((request, index) => ({ request, index }))
    .sort((left, right) => right.request - left.request || left.index - right.index);
  const networkEnd = parsed.network + parsed.totalAddresses;
  let nextAddress = parsed.network;
  const allocations: VlsmAllocation[] = [];

  for (const { request } of requests) {
    const requirement = prefixForHosts(request);
    const alignedAddress =
      Math.ceil(nextAddress / requirement.addresses) * requirement.addresses;
    if (alignedAddress + requirement.addresses > networkEnd) {
      throw new Error("指定したネットワーク内に、すべてのサブネットを配置できません。");
    }
    const broadcast = alignedAddress + requirement.addresses - 1;
    allocations.push({
      request,
      prefix: requirement.prefix,
      network: formatIpv4(alignedAddress),
      broadcast: formatIpv4(broadcast),
      firstHost: formatIpv4(alignedAddress + 1),
      lastHost: formatIpv4(broadcast - 1),
      usableHosts: requirement.addresses - 2,
      addresses: requirement.addresses,
    });
    nextAddress = broadcast + 1;
  }

  return {
    inputNetwork: parsed.input,
    network: formatIpv4(parsed.network),
    prefix: parsed.prefix,
    totalAddresses: parsed.totalAddresses,
    remainingAddresses: networkEnd - nextAddress,
    allocations,
  };
}

export function formatVlsmPlan(plan: VlsmPlan) {
  return [
    `ネットワーク: ${plan.network}/${plan.prefix}`,
    `残りアドレス数: ${plan.remainingAddresses.toLocaleString("ja-JP")}`,
    ...plan.allocations.map(
      (allocation, index) =>
        `${index + 1}. ${allocation.network}/${allocation.prefix}（必要${allocation.request}台、利用可能${allocation.usableHosts}台）`,
    ),
  ].join("\n");
}
