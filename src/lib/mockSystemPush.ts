export type MockPushPayload = {
  title: string;
  body: string;
  url: string;
  icon?: string;
};

export type MockPushResult = {
  ok: boolean;
  permission: NotificationPermission | "unsupported";
  message?: string;
};

export async function requestNotificationPermission(): Promise<NotificationPermission | "unsupported"> {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  return Notification.requestPermission();
}

export async function sendMockSystemNotification(payload: MockPushPayload): Promise<MockPushResult> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return { ok: false, permission: "unsupported", message: "알림을 지원하지 않는 환경입니다." };
  }

  const permission = await requestNotificationPermission();
  if (permission !== "granted") {
    return {
      ok: false,
      permission,
      message: permission === "denied" ? "알림 권한이 차단되어 있습니다." : "알림 권한이 필요합니다.",
    };
  }

  const icon = payload.icon ?? "/main_icon.png";
  const data = { url: payload.url };

  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(payload.title, {
        body: payload.body,
        icon,
        badge: icon,
        data,
        tag: "nalleum-mock-push",
      });
      return { ok: true, permission };
    } catch {
      // fallback below
    }
  }

  const notification = new Notification(payload.title, {
    body: payload.body,
    icon,
    data,
  });

  notification.onclick = () => {
    window.focus();
    window.location.href = payload.url;
  };

  return { ok: true, permission };
}
