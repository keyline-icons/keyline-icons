import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PackageOpen({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 13.2413L8.1314 16.2413L2 12.7413L5 9.7413L12 6.2413L15.5449 2L22 5.2413L19 9.7413L19 18.618L12 22L5 18.618L5 14.4538M5 9.7413L12 13.2413L19 9.7413M12 13.2413L12 22M12 6.2413L19 9.7413"/>
    </svg>
  )
}
