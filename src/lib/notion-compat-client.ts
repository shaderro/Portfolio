import { NotionCompatAPI } from "notion-compat";

/** Lower concurrency to reduce ECONNRESET on unstable networks. */
export class StableNotionCompatAPI extends NotionCompatAPI {
  async resolvePage(
    rootBlockId: string,
    options: { concurrency?: number } = {},
  ) {
    return super.resolvePage(rootBlockId, {
      concurrency: options.concurrency ?? 1,
    });
  }
}
