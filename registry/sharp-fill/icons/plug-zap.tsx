import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlugZap({ size = 24, ...props }: IconProps) {
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
      <path d="M7.6569 13.5147L10.3068 10.8648M10.4853 16.3431L13.1352 13.6932M3.8856 20.1144L1.7071 22.2929M20.7929 1.7071L16 6.5L22 6.5L17.2071 11.2929" fill="none"/>
      <path d="M6.4783 10.922L13.078 17.5217C13.4686 17.9122 13.4686 18.5454 13.078 18.9359L11.1924 20.8215C8.9794 23.0345 5.3915 23.0344 3.1785 20.8215C0.9656 18.6085 0.9655 15.0206 3.1785 12.8076L5.0641 10.922C5.4546 10.5314 6.0878 10.5314 6.4783 10.922Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
