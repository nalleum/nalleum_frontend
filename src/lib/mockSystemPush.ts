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

function isStandalonePwa() {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return window.matchMedia?.("(display-mode: standalone)")?.matches || nav.standalone === true;
}

async function getServiceWorkerRegistration() {
  if (!("serviceWorker" in navigator)) return null;

  try {
    await navigator.serviceWorker.register("/sw.js", { scope: "/" });
  } catch {
    // Keep going and try existing registration.
  }

  try {
    return await navigator.serviceWorker.ready;
  } catch {
    return null;
  }
}

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

  const registration = await getServiceWorkerRegistration();
  if (registration) {
    try {
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

  try {
    const notification = new Notification(payload.title, {
      body: payload.body,
      icon,
      data,
    });

    notification.onclick = () => {
      window.focus();
      window.location.href = payload.url;
    };
  } catch {
    return {
      ok: false,
      permission,
      message: isStandalonePwa()
        ? "현재 기기에서 알림 표시가 제한되어 있습니다. 브라우저 알림 설정을 확인해 주세요."
        : "모바일에서는 홈 화면에 설치한 PWA에서 알림이 동작할 수 있습니다.",
    };
  }

  return { ok: true, permission };
}
