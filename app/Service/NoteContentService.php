<?php

namespace App\Service;

use App\Models\Note;
use Illuminate\Support\Facades\Storage;

class NoteContentService
{
    public function __construct(
        private Note $note
    ) {}

    public function process(): array
    {
        return $this->replaceImage();
    }

    private function replaceImage(): array
    {
        $content = $this->note->content;

        array_walk_recursive($content, function (&$value) {

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

        return $content;
    }
}
