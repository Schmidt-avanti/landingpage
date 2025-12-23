import { getPayloadClient } from '@/payloadClient'

export const GET = async (request: Request) => {
  const payload = await getPayloadClient()

  const debugVersion = '2025-12-23T14:06Z-pool-query'

  const url = new URL(request.url)
  const mode = url.searchParams.get('mode')
  const pageId = url.searchParams.get('pageId')

  if (mode === 'update-test') {
    if (!pageId) {
      return Response.json({ ok: false, error: 'Missing pageId' }, { status: 400 })
    }

    try {
      const page = await payload.findByID({
        collection: 'pages',
        id: pageId,
        depth: 0,
      })

      const updated = await payload.update({
        collection: 'pages',
        id: pageId,
        depth: 0,
        data: {
          title: page.title,
        },
      })

      return Response.json({
        ok: true,
        mode,
        pageId,
        updatedId: updated.id,
      })
    } catch (err: any) {
      return Response.json(
        {
          ok: false,
          mode,
          pageId,
          error: {
            message: err?.message,
            name: err?.name,
            stack: err?.stack,
            cause: err?.cause,
            data: err?.data,
          },
        },
        { status: 500 },
      )
    }
  }

  if (mode === 'update-test-auth') {
    if (!pageId) {
      return Response.json({ ok: false, error: 'Missing pageId' }, { status: 400 })
    }

    try {
      const auth = await payload.auth({ headers: request.headers })
      const user = auth?.user

      const page = await payload.findByID({
        collection: 'pages',
        id: pageId,
        depth: 0,
        user,
        overrideAccess: false,
      })

      const updated = await payload.update({
        collection: 'pages',
        id: pageId,
        depth: 0,
        user,
        overrideAccess: false,
        data: {
          title: page.title,
          slug: page.slug,
          layout: page.layout,
        },
      })

      return Response.json({
        ok: true,
        mode,
        pageId,
        userId: (user as any)?.id ?? null,
        updatedId: updated.id,
      })
    } catch (err: any) {
      return Response.json(
        {
          ok: false,
          mode,
          pageId,
          error: {
            message: err?.message,
            name: err?.name,
            stack: err?.stack,
            cause: err?.cause,
            data: err?.data,
          },
        },
        { status: 500 },
      )
    }
  }

  const raw = process.env.DATABASE_URL
  let dbInfo: { host?: string; db?: string } | null = null
  try {
    if (raw) {
      const u = new URL(raw)
      dbInfo = {
        host: u.host,
        db: u.pathname.replace(/^\//, ''),
      }
    }
  } catch {
    dbInfo = { host: 'invalid', db: 'invalid' }
  }

  const db = (payload as any)?.db
  const dbKeys = db && typeof db === 'object' ? Object.keys(db) : null

  const run = async (fn: () => Promise<any>) => {
    try {
      return { ok: true, value: await fn() }
    } catch (err: any) {
      return {
        ok: false,
        error: {
          message: err?.message,
          code: err?.code,
          detail: err?.detail,
        },
      }
    }
  }

  const canExecute = Boolean(db && typeof db.execute === 'function')
  const pool = db && typeof db === 'object' ? (db as any).pool : null
  const canPoolQuery = Boolean(pool && typeof pool.query === 'function')

  const checks = canPoolQuery
    ? {
        pages_blocks_text_block: await run(() =>
          pool.query("select to_regclass('public.pages_blocks_text_block') as name"),
        ),
        payload_preferences_rels: await run(() =>
          pool.query("select to_regclass('public.payload_preferences_rels') as name"),
        ),
        payload_locked_documents_rels_industries_id: await run(() =>
          pool.query(
            "select 1 from information_schema.columns where table_schema = 'public' and table_name = 'payload_locked_documents_rels' and column_name = 'industries_id' limit 1",
          ),
        ),
        payload_preferences_rels_key: await run(() =>
          pool.query(
            "select 1 from information_schema.columns where table_schema = 'public' and table_name = 'payload_preferences_rels' and column_name = 'key' limit 1",
          ),
        ),

        // Column existence (these are what the failing queries depend on)
        payload_preferences_has_key: await run(() =>
          pool.query(
            "select 1 from information_schema.columns where table_schema = 'public' and table_name = 'payload_preferences' and column_name = 'key' limit 1",
          ),
        ),
        payload_preferences_has_created_at: await run(() =>
          pool.query(
            "select 1 from information_schema.columns where table_schema = 'public' and table_name = 'payload_preferences' and column_name = 'created_at' limit 1",
          ),
        ),
        payload_preferences_rels_has_users_id: await run(() =>
          pool.query(
            "select 1 from information_schema.columns where table_schema = 'public' and table_name = 'payload_preferences_rels' and column_name = 'users_id' limit 1",
          ),
        ),
        payload_preferences_rels_has_parent_id: await run(() =>
          pool.query(
            "select 1 from information_schema.columns where table_schema = 'public' and table_name = 'payload_preferences_rels' and column_name = 'parent_id' limit 1",
          ),
        ),
        payload_preferences_rels_has_path: await run(() =>
          pool.query(
            "select 1 from information_schema.columns where table_schema = 'public' and table_name = 'payload_preferences_rels' and column_name = 'path' limit 1",
          ),
        ),

        payload_locked_documents_rels_has_pages_id: await run(() =>
          pool.query(
            "select 1 from information_schema.columns where table_schema = 'public' and table_name = 'payload_locked_documents_rels' and column_name = 'pages_id' limit 1",
          ),
        ),

        // Probe queries (match the ones shown in your runtime error)
        probe_payload_preferences_nav: await run(() =>
          pool.query(
            `select distinct "payload_preferences"."id", "payload_preferences"."created_at", "payload_preferences"."created_at"
             from "payload_preferences"
             left join "payload_preferences_rels" rel
               on ("payload_preferences"."id" = rel."parent_id" and rel."path" like $1)
             where ("payload_preferences"."key" = $2 and rel."users_id" is not null and rel."users_id" = $3)
             order by "payload_preferences"."created_at" desc
             limit $4`,
            ['user', 'nav', 1, 1],
          ),
        ),

        probe_payload_locked_documents_pages: await run(() =>
          pool.query(
            `select distinct "payload_locked_documents"."id", "payload_locked_documents"."updated_at", "payload_locked_documents"."updated_at", "payload_locked_documents"."created_at", "payload_locked_documents"."created_at"
             from "payload_locked_documents"
             left join "payload_locked_documents_rels" rel
               on ("payload_locked_documents"."id" = rel."parent_id" and rel."path" like $1)
             where (rel."pages_id" is not null and (rel."users_id" = $2 or rel."media_id" = $3 or rel."pages_id" = $4 or rel."services_id" = $5 or rel."testimonials_id" = $6 or rel."form_submissions_id" = $7 or rel."industries_id" = $8))
             order by "payload_locked_documents"."updated_at" desc, "payload_locked_documents"."created_at" desc
             limit $9`,
            ['document', 2, 2, 2, 2, 2, 2, 2, 1],
          ),
        ),
      }
    : null

  return Response.json({
    ok: true,
    debugVersion,
    db: dbInfo,
    payload: {
      hasDb: Boolean(db),
      dbType: typeof db,
      dbKeys,
    },
    canExecute,
    canPoolQuery,
    checks,
  })
}
