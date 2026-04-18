import type { Content, ContentId } from "@/domain/entities/Content";

export interface Favorite {
  id: string;
  contentId: ContentId;
  content: Content;
}
