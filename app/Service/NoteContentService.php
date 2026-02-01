<?php

namespace App\Service;

use App\Models\Note;
use Illuminate\Support\Facades\Storage;

class NoteContentService
{
    private $content;

    public function __construct(
        private Note $note
    ) {
        $this->content = $note->content;
    }

    public function process(): array
    {
        $this->replaceImage();
        $this->deleteOldImages();

        return $this->content;
    }

    private function replaceImage(): void
    {
        array_walk_recursive($this->content, function (&$value) {

            if (is_string($value) && str_starts_with($value, 'data:image/')) {

                preg_match('/data:image\/(?<extension>[^;]+);base64,(?<data>.+)/', $value, $matches);

                $data = base64_decode($matches['data']);
                $hash = hash('sha256', $data);
                $fileName = "notes/{$this->note->id}/{$hash}.{$matches['extension']}";

                if (!Storage::disk('public')->exists($fileName)) {
                    Storage::disk('public')->put($fileName, $data);
                }

                $value = Storage::url($fileName);
            }
        });
    }

    private function deleteOldImages(): void
    {
        $notePath = "notes/{$this->note->id}";

        $usedImages = [];

        array_walk_recursive($this->content, function ($value) use (&$usedImages, $notePath) {
            if (!is_string($value)) return;

            $path = ltrim(parse_url($value, PHP_URL_PATH) ?? '', '/');
            $path = str_replace('storage/', '', $path);

            if (str_starts_with($path, $notePath)) {
                $usedImages[] = $path;
            }
        });

        $storedImages = Storage::disk('public')->files($notePath);
        $imagesToDelete = array_diff($storedImages, $usedImages);

        Storage::disk('public')->delete($imagesToDelete);
    }
}
