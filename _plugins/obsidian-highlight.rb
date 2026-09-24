# frozen_string_literal: true

require 'kramdown/parser/kramdown'

module Kramdown
  module Parser
    # Add Obsidian-style ==highlights== without changing normal Markdown parsing.
    class Obsidian < Kramdown
      def initialize(source, options)
        super
        @span_parsers.unshift(:obsidian_highlight)
      end

      def parse_obsidian_highlight
        start_line = @src.current_line_number
        start_pos = @src.save_pos
        @src.scan(/==/)

        # Spaces or extra '=' immediately after the opener usually mean an
        # equality expression, not an Obsidian highlight.
        if @src.check(/[\s=]/) || (@tree.type == :html_element && @tree.value == 'mark')
          add_text(+'==')
          return
        end

        mark = Element.new(:html_element, 'mark', {}, category: :span,
                          content_model: :span, location: start_line)
        found = parse_spans(mark, /==/) do
          !mark.children.empty? && @src.pre_match[-1, 1] !~ /\s/
        end

        if found
          @src.scan(/==/)
          @tree.children << mark
        else
          @src.revert_pos(start_pos)
          @src.pos += 2
          add_text(+'==')
        end
      end
      define_parser(:obsidian_highlight, /==/, '=')
    end
  end
end
