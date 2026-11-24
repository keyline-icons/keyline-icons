import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GlassWater({ size = 24, ...props }: IconProps) {
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
      <path d="M4.0002 2H19.9998C20.6145 2 21.0837 2.5494 20.9874 3.1566L18.2674 20.3132C18.1134 21.2847 17.2758 22 16.2921 22H7.7079C6.7242 22 5.8866 21.2847 5.7326 20.3132L3.0125 3.1566C2.9163 2.5494 3.3855 2 4.0002 2ZM3.6219 7C6 6 9.5 6 12 7C14.5 8 18 8 20.3781 7"/>
    </svg>
  )
}
