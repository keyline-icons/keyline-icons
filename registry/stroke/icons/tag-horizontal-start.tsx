import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TagHorizontalStart({ size = 24, ...props }: IconProps) {
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
      <path d="M19 4L10 4C9.469567 4 8.96086 4.210712 8.585786 4.585786L2.585786 10.585786C1.804693 11.366879 1.804693 12.633121 2.585786 13.414214L8.585786 19.414214C8.96086 19.789288 9.469567 20 10 20L19 20C20.656854 20 22 18.656854 22 17L22 7C22 5.343146 20.656854 4 19 4Z"/>
      <path d="M10.5 12C10.5 12.8284 9.8284 13.5 9 13.5C8.1716 13.5 7.5 12.8284 7.5 12C7.5 11.1716 8.1716 10.5 9 10.5C9.8284 10.5 10.5 11.1716 10.5 12Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
