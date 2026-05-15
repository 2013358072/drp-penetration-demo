import { RISK_SAMPLES, WORK_ORDERS } from '@/mock/index.js'

export const SCENE_ROUTE_NAME_MAP = {
  investment: 'investment',
  funds: 'funds',
  finance: 'finance',
  property: 'property',
  contract: 'contract',
  procurement: 'procurement',
  salary: 'salary',
  overseas: 'overseas',
  banking: 'banking',
  accounting: 'accounting',
}

const RISK_TARGET_QUERY_MAP = {
  R01: { projectId: 'P01' },
  R02: { accountId: 'A1002', paymentOrderId: 'PO-2026-0418-017' },
  R03: { expenseId: 'F01' },
  R04: { nodeId: 'pr1' },
  R05: { contractId: 'CT-2026-0312' },
  R06: { packageId: 'CG-2026-0501' },
  R07: { anomalyId: 'S01' },
  R08: { overseasProjectId: 'ov_sea_proj' },
  R09: { businessId: 'B03' },
  R10: { entryId: 'E002' },
  R11: { projectId: 'P06' },
}

function cleanQuery(query) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined && value !== null && value !== '')
  )
}

export function findRiskSample(riskOrId) {
  if (!riskOrId) return null
  if (typeof riskOrId === 'object') return riskOrId
  return RISK_SAMPLES.find((item) => item.id === riskOrId) || null
}

export function findWorkOrderByRisk(riskOrId) {
  const risk = findRiskSample(riskOrId)
  if (!risk) return null
  return WORK_ORDERS.find((item) => item.riskId === risk.id) || null
}

export function resolveSceneRouteName(scene) {
  return SCENE_ROUTE_NAME_MAP[scene] || 'dashboard'
}

export function getPenetrationLocation(sceneOrRisk, extraQuery = {}) {
  const risk = findRiskSample(sceneOrRisk)
  const scene = risk?.scene || sceneOrRisk
  return {
    name: resolveSceneRouteName(scene),
    query: cleanQuery({
      scene,
      riskId: risk?.id,
      ...RISK_TARGET_QUERY_MAP[risk?.id],
      ...extraQuery,
    }),
  }
}

export function getRiskCenterLocation(riskOrId, extraQuery = {}) {
  const risk = findRiskSample(riskOrId)
  const workOrder = findWorkOrderByRisk(risk)
  return {
    name: 'risk-center',
    query: cleanQuery({
      riskId: risk?.id,
      scene: risk?.scene,
      workOrderId: workOrder?.id,
      ...extraQuery,
    }),
  }
}

export function getWorkOrderLocation(workOrderOrRisk, extraQuery = {}) {
  const directWorkOrderId = typeof workOrderOrRisk === 'object' ? workOrderOrRisk?.workOrderId : ''
  const directRiskId = typeof workOrderOrRisk === 'object' ? workOrderOrRisk?.riskId : ''
  const risk = findRiskSample(directRiskId || workOrderOrRisk)
  const workOrder = typeof workOrderOrRisk === 'object' && workOrderOrRisk?.id?.startsWith('WO-')
    ? workOrderOrRisk
    : (typeof workOrderOrRisk === 'string' && workOrderOrRisk.startsWith('WO-')
        ? WORK_ORDERS.find((item) => item.id === workOrderOrRisk) || null
        : (directWorkOrderId
            ? WORK_ORDERS.find((item) => item.id === directWorkOrderId) || null
            : findWorkOrderByRisk(risk)))

  return {
    name: 'work-orders',
    query: cleanQuery({
      workOrderId: extraQuery.workOrderId || directWorkOrderId || workOrder?.id,
      riskId: extraQuery.riskId || directRiskId || workOrder?.riskId || risk?.id,
      scene: extraQuery.scene || workOrderOrRisk?.scene || risk?.scene,
    }),
  }
}
