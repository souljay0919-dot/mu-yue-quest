/**
 * 預約註冊 API 模組
 * 對應後端 /registrations 端點
 */

import request from "./request";

export interface Registration {
  id: string;
  username: string;
  password: string;
  created_at: string;
}

export interface CreateRegistrationParams {
  username: string;
  password: string;
}

/** 新增預約 (POST /registrations) */
export function createRegistration(data: CreateRegistrationParams) {
  return request.post<Registration>("/registrations", data);
}

/** 取得所有預約 (GET /registrations) */
export function getRegistrations() {
  return request.get<Registration[]>("/registrations");
}

/** 取得單筆預約 (GET /registrations/:id) */
export function getRegistrationById(id: string) {
  return request.get<Registration>(`/registrations/${id}`);
}

/** 更新預約 (PUT /registrations/:id) */
export function updateRegistration(id: string, data: Partial<CreateRegistrationParams>) {
  return request.put<Registration>(`/registrations/${id}`, data);
}

/** 刪除預約 (DELETE /registrations/:id) */
export function deleteRegistration(id: string) {
  return request.del<{ success: boolean }>(`/registrations/${id}`);
}
