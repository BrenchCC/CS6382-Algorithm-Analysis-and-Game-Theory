-- Convert GitHub display-math blocks and vector image paths for PDF output.
function CodeBlock(block)
  if block.classes:includes('math') then
    return pandoc.Para({pandoc.Math('DisplayMath', block.text)})
  end
end
function Header(header)
  if header.level == 1 then return {} end
  header.level = header.level - 1
  return header
end
function Image(img)
  local name = img.src:match('([^/]+)%.svg$')
  if name then img.src = os.getenv('HANDOUT_FIGURE_DIR') .. '/' .. name .. '.pdf' end
  return img
end
function Table(tbl)
  local widths = {
    [2] = {0.32, 0.68},
    [3] = {0.22, 0.34, 0.44},
    [4] = {0.13, 0.19, 0.23, 0.45}
  }
  local chosen = widths[#tbl.colspecs]
  if chosen then
    for i, width in ipairs(chosen) do tbl.colspecs[i][2] = width end
  end
  return tbl
end
