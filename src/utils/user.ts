export function formatNickname(nickname?: string) {
  const normalized = nickname?.trim()
  return normalized ? `${normalized}님` : '사용자님'
}

export function getNicknameInitial(nickname?: string) {
  return nickname?.trim().charAt(0) || '사'
}
