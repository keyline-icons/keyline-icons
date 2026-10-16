import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CopyPlus({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11 7L19 7C21.20914 7 23 8.79086 23 11L23 19C23 21.20914 21.20914 23 19 23L11 23C8.79086 23 7 21.20914 7 19L7 11C7 8.79086 8.79086 7 11 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15.8284 4C15.4046 2.8015 14.2714 2 13 2H5C3.34315 2 2 3.34315 2 5V13C2 14.2714 2.8015 15.4046 4 15.8284M11 8H19C20.65684 8 22 9.34316 22 11V19C22 20.65684 20.65684 22 19 22H11C9.34316 22 8 20.65684 8 19V11C8 9.34316 9.34316 8 11 8ZM15 12V18M12 15H18"/>
    </svg>
  )
}
